import Image from "next/image";
import { AiFillApple, AiOutlineApple, AiOutlineGoogle } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { roboto, roboto_slab } from "../_app";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toaster } from "@/components";
import { Squares } from "react-activity";

const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [check, setCheck] = useState(false);
  const handleGoogleSignin = async () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const status = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: "/",
      });

      if (!status?.ok) toaster(status?.error as string, "error");
      if (status?.ok) router.push(status?.url as any);
    } catch (error) {
      toaster(error as string, "error");
    } finally {
      setLoading(false);
    }
  };

  console.log("I am on the client side");

  return (
    <div className="grid">
      <div className="grid grid-rows-5 md:grid-cols-2 w-screen h-screen md:flex">
        <div className="row-span-2 w-full h-full">
          <Image
            src={"/assets/printer.png"}
            alt="success"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="grid row-span-3 bg-[var(--neutral-10)] px-8 md:px-32 py-8 pb-24 md:py-32 w-full overflow-x-hidden">
          <div className="gap-6 flex flex-col">
            <div className="flex flex-row gap-2 md:gap-8 items-center">
              <Image
                src={"/assets/logo.png"}
                alt="logo"
                width={56}
                height={56}
              />
              <p className="font-[dm-sans] text-[var(--primary-600)] font-semibold text-2xl md:text-4xl block">
                Universal Print Tech
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className={`${roboto_slab.className} text-[var(--gray-900)] font-bold text-3xl md:text-5xl`}
              >
                Sign in to your account
              </p>
              <p
                className={`font-normal text-[var(--gray-700)] ${roboto.className} text-lg`}
              >
                Fill in the neccesary information to get access to your account
              </p>
            </div>
            <div>
              <p
                className={`font-normal text-[var(--gray-900)] ${roboto.className} text-lg`}
              >
                Sign in with
              </p>
              <div className="flex items-center justify-between">
                <button className="btn-outline px-10">
                  <AiFillApple size={24} className={"text-[var(--gray-700)]"} />
                </button>
                <button
                  className="btn-outline px-10"
                  onClick={handleGoogleSignin}
                >
                  <AiOutlineGoogle size={24} className={"text-[#DB4437]"} />
                </button>
                <button className="btn-outline px-10">
                  <BiLogoFacebook size={24} className={"text-[#4267B2]"} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-grow h-px bg-[var(--gray-500)]" />
              <p
                className={`${roboto.className} text-[var(--gray-700)] text-sm font-normal text-center`}
              >
                or continue with
              </p>
              <div className="flex-grow h-px bg-[var(--gray-500)]" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid gap-1">
                <p
                  className={`${roboto.className} text-[var(--gray-800)] text-lg font-normal`}
                >
                  Email
                </p>
                <input
                  className={`border-2 rounded-md w-full h-12 px-4 md:px-6 ${
                    !emailValid && check && "border-[var(--warning-500)]"
                  }`}
                  onChange={(e) => {
                    setEmailValid(emailFormat.test(e.target.value));
                    setCheck(true);
                    setEmail(e.target.value);
                  }}
                />
                {!emailValid && check && (
                  <p className="text-[var(--warning-500)]">
                    Please enter a valid email
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <p
                  className={`${roboto.className} text-[var(--gray-800)] text-lg font-normal`}
                >
                  Password
                </p>
                <div className="flex flex-col gap-2 items-center">
                  <input
                    className="border-2 rounded-md w-full h-12 px-4 md:px-6"
                    type={show ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex gap-2 items-center self-end">
                    <input type="checkbox" onChange={(e) => setShow(!show)} />
                    <p
                      className={`${roboto.className} text-[var(--gray-900)] text-lg font-normal`}
                    >
                      Show password
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <p
                    className={`${roboto.className} text-[var(--gray-900)] text-lg font-normal`}
                  >
                    Remember me
                  </p>
                </div>
                <Link href={"#"}>
                  <p
                    className={`${roboto.className} text-[var(--primary-600)] text-lg font-normal`}
                  >
                    Forgot password?
                  </p>
                </Link>
              </div>
              <div>
                <button
                  className={`btn-primary w-full ${
                    // isLoading ||
                    (!emailValid || !password || loading) && "opacity-20"
                  }`}
                  disabled={
                    // isLoading ||
                    !emailValid || !password || loading
                  }
                  onClick={handleLogin}
                >
                  {loading ? (
                    <div className="flex gap-4 items-center justify-center">
                      <p className="text-center">Please wait</p>
                      <Squares
                        size={16}
                        color={"var(--primary-300)"}
                        speed={0.6}
                        className="self-center"
                      />
                    </div>
                  ) : (
                    <p className="text-center">Sign in</p>
                  )}
                </button>
              </div>
              <div>
                <p
                  className={`${roboto.className} text-[var(--gray-600)] text-lg font-normal text-center`}
                >
                  Dont have an account?{" "}
                  <span className="text-[var(--primary-600)]">
                    <Link href={"/signup"}>Create account</Link>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex fixed bottom-0 right-0 left-0 justify-evenly px-10 md:ml-[50vw] bg-[var(--neutral-10)] py-4 md:py-8">
              <p
                className={`${roboto.className} text-[var(--primary-600)] text-sm md:text-lg font-normal`}
              >
                Privacy &amp; Terms
              </p>
              <p
                className={`${roboto.className} text-[var(--primary-600)] text-sm md:text-lg font-normal`}
              >
                Contact us
              </p>
              <p
                className={`${roboto.className} text-[var(--primary-600)] text-sm md:text-lg font-normal`}
              >
                English US
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
