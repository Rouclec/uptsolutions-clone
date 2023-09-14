import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "models/User";
import DB from "lib/db";
import Role from "models/Role";
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 40000,
            },
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                await DB()

                const user = await User.findOne({ email: credentials.email }).select('+password').populate('role')

                if (!user) {
                    throw new Error('No user found with the email, please signup')
                }
                const correct = await user.comparePassword(credentials.password)

                if (!correct) {
                    throw new Error("Email and password doesn't match")
                }

                return user;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return {
                user, account, profile, email, credentials
            };
        },

        async session({ session }) {
            if (!session) return session;
            // connect DB
            await DB();
            // check if the user is already present or not
            const isUser = await User.findOne({ email: session?.user?.email });
            if (isUser) {
                session.user._id = isUser._id;
                session.user.name = isUser?.fullName
                session.user.profileImage = isUser?.profileImage
                session.user.phoneNumber = isUser?.phoneNumber
                session.user.role = isUser.role
                return session;
            }

            try {
                // create a new user
                const userRole = await Role.findOne({ code: "user" });
                const user = new User({
                    email: session.user.email,
                    fullName: session.user.name,
                    role: userRole._id,
                    profileImage: session.user?.image || session?.user?.picture
                });
                const userCreated = await user.save({ validateBeforeSave: false });

                session.user._id = userCreated._id;
                return session;
            } catch (error) {
                console.log('error creating user: ', error)
            }
        },
    },
    debug: true,
    secret: process.env.GOOGLE_CLIENT_SECRET || "123",
});
