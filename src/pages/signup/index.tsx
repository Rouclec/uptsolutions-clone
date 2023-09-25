import Image from "next/image";
import { AiFillApple, AiOutlineApple, AiOutlineGoogle } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { roboto, roboto_slab } from "../_app";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useLogin } from "@/hooks/auth/authHooks";
import { toaster } from "@/components";
import { Squares } from "react-activity";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoginIn, setIsLogingIn] = useState(false);

  const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordFormat =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{6,30}$/;

  const handleGoogleSignin = async () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };
  const onError = (error: any) => {
    toaster(
      error?.response
        ? error.response.data.message
        : error?.message
        ? error.message
        : "An unknown error occured",
      "error"
    );
  };

  const onSuccess = async (data: any) => {
    setIsLogingIn(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: data?.data?.data?.user?.email,
      password: password,
      callbackUrl: "/",
    });

    if (status?.ok) router.push(status?.url as any);
    setIsLogingIn(false);
  };

  const handleSignUp = () => {
    const data = {
      fullName: fullName.trim(),
      email,
      password,
      passwordConfirm,
    };
    mutate(data);
  };

  const { mutate, isLoading } = useLogin(onSuccess, onError);
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
                Universal PrinTech
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className={`${roboto_slab.className} text-[var(--gray-900)] font-bold text-3xl md:text-5xl`}
              >
                Create a free account
              </p>
              <p
                className={`font-normal text-[var(--gray-700)] ${roboto.className} text-lg`}
              >
                Fill in the neccesary information to create an account
              </p>
            </div>
            <div>
              <p
                className={`font-normal text-[var(--gray-900)] ${roboto.className} text-lg`}
              >
                Sign up with
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
                  Full name
                </p>
                <input
                  className={`border-2 rounded-md w-full h-12 px-4 md:px-6 ${
                    fullName.length < 3 &&
                    check &&
                    "border-[var(--warning-500)]"
                  }`}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setCheck(true);
                  }}
                />
                {fullName.length < 3 && check && (
                  <p className="text-[var(--warning-500)]">
                    {"Please enter your full name"}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <p
                  className={`${roboto.className} text-[var(--gray-800)] text-lg font-normal`}
                >
                  Email
                </p>
                <input
                  className={`border-2 rounded-md w-full h-12 px-4 md:px-6 ${
                    !emailValid && "border-[var(--warning-500)]"
                  }`}
                  onChange={(e) => {
                    setEmailValid(emailFormat.test(e.target.value));
                    setEmail(e.target.value);
                    setCheck(true);
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
                <input
                  className={`border-2 rounded-md w-full h-12 px-4 md:px-6 ${
                    !passwordValid && "border-[var(--warning-500)]"
                  }`}
                  type={show ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordValid(passwordFormat.test(e.target.value));
                    setCheck(true);
                  }}
                />
                {!passwordValid && check && (
                  <p className="text-[var(--warning-500)]">
                    {"Password doesn't meet required strength"}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <p
                  className={`${roboto.className} text-[var(--gray-800)] text-lg font-normal`}
                >
                  Confirm Password
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    className={`border-2 rounded-md w-full h-12 px-4 md:px-6 ${
                      passwordConfirm !== password &&
                      passwordConfirm.length > 0 &&
                      "border-[var(--warning-500)]"
                    }`}
                    type={show ? "text" : "password"}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  {passwordConfirm !== password &&
                    passwordConfirm.length > 0 &&
                    check && (
                      <p className="text-[var(--warning-500)] text-left">
                        {"Passwords do not match"}
                      </p>
                    )}
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
              <div>
                <ul
                  className={`grid gap-2 list-disc px-8 py-4 text-lg ${roboto.className} font-normal text-[var(--gray-900)]`}
                >
                  <li>6 characters minimum</li>
                  <li>At least 1 number</li>
                  <li>Upper &amp; lowercase characters</li>
                </ul>
              </div>
              <div>
                <button
                  className={`btn-primary w-full ${
                    (isLoading ||
                      !emailValid ||
                      !passwordValid ||
                      password !== passwordConfirm ||
                      !fullName ||
                      isLoginIn) &&
                    "opacity-20"
                  }`}
                  disabled={
                    isLoading ||
                    !emailValid ||
                    !passwordValid ||
                    password !== passwordConfirm ||
                    !fullName ||
                    isLoginIn
                  }
                  onClick={handleSignUp}
                >
                  {isLoading || isLoginIn ? (
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
                    <p className="text-center">Create account</p>
                  )}
                </button>
              </div>
              <div>
                <p
                  className={`${roboto.className} text-[var(--gray-600)] text-lg font-normal text-center`}
                >
                  Alredy have an account?{" "}
                  <span className="text-[var(--primary-600)]">
                    <Link href={"/signin"}>Sign in</Link>
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
