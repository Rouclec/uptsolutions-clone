import DB from "lib/db";
import User from "models/User";
import Role from "models/Role";

export default async function signup(req, res, next) {
  await DB();

  const { fullName, email, password, passwordConfirm } = req.body;

  const userRole = await Role.findOne({ code: "user" });

  const newUser = {
    fullName,
    email,
    password,
    passwordConfirm,
    role: userRole._id,
  };

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(500).json({
      status: "Server error",
      message: `User with email ${email} already exists`,
    });
  }

  const user = await User.create(newUser);

  res.send({
    status: "OK",
    data: {
      user,
      role: userRole,
    },
  });
}
