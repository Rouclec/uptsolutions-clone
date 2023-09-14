import { Header, SideBar, UpdateModal, toaster } from "@/components";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Sentry, Squares } from "react-activity";
import { roboto, roboto_slab } from "./_app";
import { MouseEventHandler, useRef, useState } from "react";
import { User } from "@/types";
import Image from "next/image";
import { CiCircleChevRight } from "react-icons/ci";
import { useGetUser, useUpdateUser } from "@/hooks/auth/authHooks";
import moment from "moment";
import { S3 } from "aws-sdk";

function Account() {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();
  const user = session.data?.user as User;
  const inputRef = useRef() as any;
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_TOKEN,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  });

  // const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "", name: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [modalData, setModalData] = useState({
    title: "",
    inputs: [
      {
        label: "",
        placeHolder: "",
        onChange: (e: any) => {},
        defaultValue: "",
        type: "text",
      } as any,
    ],
  });
  const [showModal, setShowModal] = useState(false);
  const [upload, setUpload] = useState<S3.ManagedUpload | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        name: e.target.files[0].name,
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    let profileImageString;
    setLoading(true);
    if (!!image.raw && !!image.name && !!image.preview) {
      const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET as string;
      const params = {
        Bucket: BUCKET,
        Key: image?.name,
        Body: image?.raw,
      };
      try {
        const upload = s3.upload(params);
        setUpload(upload);
        upload.on("httpUploadProgress", (p) => {
          console.log(p.loaded / p.total);
          setProgress(p.loaded / p.total);
        });
        const result = await upload.promise();
        profileImageString = result?.Location;
      } catch (error) {
        toaster("An unknown error occured while uploading image", "error");
      }
    }

    let userFullname;
    if (firstName && !lastName) {
      userFullname = firstName + userData?.data?.data?.fullName.split(" ")[1];
    } else if (!firstName && lastName) {
      userFullname = userData?.data?.data?.fullName.split(" ")[0] + lastName;
    } else if (firstName && lastName) {
      userFullname = firstName + lastName;
    } else {
      userFullname = userData?.data?.data?.fullName;
    }
    const data = {
      _id: userData?.data?.data?._id,
      email: email || userData?.data?.data?.email,
      phoneNumber: phoneNumber || userData?.data?.data?.phoneNumber,
      address: address || userData?.data?.data?.address,
      profileImage: profileImageString || userData?.data?.data?.profileImage,
      fullName: userFullname,
    };
    mutate(data);
  };

  const onError = (error: any) => {
    console.log("error creating: ", error);
    setLoading(false);
    toaster(
      error?.response
        ? error.response.data.message
        : error?.message
        ? error.message
        : "An unknown error occured",
      "error"
    );
  };

  const { isLoading, data: userData } = useGetUser(
    user?._id as string,
    () => {},
    onError
  );

  const { mutate } = useUpdateUser(() => {
    setLoading(false);
    toaster("Profile updated successfully!", "success");
  }, onError);

  if (isLoading) {
    return (
      <SideBar>
        <div
          className={`flex h-[calc(100vh-10rem)] items-center justify-center overflow-y-hidden`}
        >
          <Header>
            <p
              className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
            >
              Account
            </p>
          </Header>
          <div className="self-center">
            <Sentry size={120} speed={0.2} color="var(--primary-600)" />
          </div>
        </div>
      </SideBar>
    );
  }

  return (
    <SideBar>
      <div className={`flex mt-20 md:mt-16`}>
        <Header>
          <p
            className={`text-[var(--gray-800)] ${roboto_slab.className} text-2xl font-semibold`}
          >
            Account
          </p>
          <div className="w-full items-center justify-end flex p-2">
            <button
              className={`btn-primary ${loading && "opacity-20"}`}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <p className="text-center">Please wait</p>
                  <Squares
                    size={16}
                    color={"var(--primary-300)"}
                    speed={0.6}
                    className="self-center"
                  />
                </>
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </Header>
        <div className="card p-8 w-full grid mt-16 md:mt-12">
          <div className="flex w-full border-b-2 p-2 items-center justify-between">
            <p
              className={`${roboto.className} text-[var(--gray-800)] font-bold text-lg md:text-2xl`}
            >
              Personal information
            </p>
          </div>
          <div className="flex w-full border-b-2 p-2 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="bg-[var(--gray-400)] rounded-lg flex items-center justify-center">
                <Image
                  src={
                    image?.preview
                      ? image.preview
                      : userData?.data?.data?.profileImage
                      ? userData?.data?.data?.profileImage
                      : "/assets/default-avatar.png"
                  }
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </div>
              <div className="grid gap-1">
                <p
                  className={`${roboto.className} text-[var(--gray-800)] font-semibold text-sm md:text-xl`}
                >
                  Upload a new photo
                </p>
                <p
                  className={`${roboto.className} text-[var(--gray-700)] font-normal text-[8px] md:text-[16px]`}
                >
                  Supported formats are png, jpeg. Maximum 1MB
                </p>
              </div>
            </div>
            <div>
              <input
                type="file"
                id="upload-button"
                className={`hidden`}
                accept=".png,.jpeg"
                ref={inputRef}
                onChange={handleChange}
              />
              <button
                className="btn-primary-small md:btn-primary"
                // onChange={handleUpload}
                onClick={() => inputRef?.current?.click()}
              >
                Upload image
              </button>
            </div>
          </div>
          <div className="grid gap-2 px-2 py-4 md:py-6 border-b-2">
            <div className="flex items-center justify-between">
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-normal text-sm md:text-xl`}
              >
                Name
              </p>
              <CiCircleChevRight
                size={20}
                className="font-extralight hover:cursor-pointer"
                onClick={() => {
                  setModalData({
                    title: "Update your name",
                    inputs: [
                      {
                        label: "First name",
                        placeHolder: "First name",
                        defaultValue: firstName
                          ? firstName
                          : userData?.data?.data?.fullName.split(" ")[0],
                        onChange: (e: any) => setFirstName(e.target.value),
                      },
                      {
                        label: "Last name",
                        placeHolder: "Last name",
                        defaultValue: lastName
                          ? lastName
                          : userData?.data?.data?.fullName.split(" ")[1],
                        onChange: (e: any) => setLastName(e.target.value),
                      },
                    ],
                  });
                  setShowModal(true);
                }}
              />
            </div>
            <div>
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-semibold text-sm md:text-xl`}
              >
                {!!firstName
                  ? firstName + lastName
                  : userData?.data?.data.fullName}
              </p>
              <p
                className={`${roboto.className} text-[var(--gray-700)] font-normal text-[8px] md:text-[16px]`}
              >{`Last updated | ${moment(
                userData?.data?.data?.updatedAt
              ).format("MMM, DD, YYYY")}`}</p>
            </div>
          </div>
          <div className="grid gap-2 px-2 py-4 md:py-6 border-b-2">
            <div className="flex items-center justify-between">
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-normal text-sm md:text-xl`}
              >
                Email address
              </p>
              <CiCircleChevRight
                size={20}
                className="font-extralight hover:cursor-pointer"
                onClick={() => {
                  setModalData({
                    title: "Update your email",
                    inputs: [
                      {
                        label: "Email",
                        placeHolder: "Email",
                        defaultValue: email
                          ? email
                          : userData?.data?.data?.email,
                        onChange: (e: any) => setEmail(e.target.value),
                      },
                    ],
                  });
                  setShowModal(true);
                }}
              />
            </div>
            <div>
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-semibold text-sm md:text-xl`}
              >
                {!!email ? email : userData?.data?.data.email}
              </p>
              <p
                className={`${roboto.className} text-[var(--gray-700)] font-normal text-[8px] md:text-[16px]`}
              >{`Last updated | ${moment(
                userData?.data?.data?.updatedAt
              ).format("MMM, DD, YYYY")}`}</p>
            </div>
          </div>
          <div className="grid gap-2 px-2 py-4 md:py-6 border-b-2">
            <div className="flex items-center justify-between">
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-normal text-sm md:text-xl`}
              >
                Phone number
              </p>
              <CiCircleChevRight
                size={20}
                className="font-extralight hover:cursor-pointer"
                onClick={() => {
                  setModalData({
                    title: "Update your phone number",
                    inputs: [
                      {
                        label: "Phone number",
                        placeHolder: "Phone number",
                        defaultValue: phoneNumber
                          ? phoneNumber
                          : userData?.data?.data?.phoneNumber,
                        onChange: (e: any) => setPhoneNumber(e.target.value),
                        type: "phone",
                      },
                    ],
                  });
                  setShowModal(true);
                }}
              />
            </div>
            <div>
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-semibold text-sm md:text-xl`}
              >
                {!!phoneNumber
                  ? phoneNumber
                  : userData?.data?.data?.phoneNumber || "No phone number"}
              </p>
              <p
                className={`${roboto.className} text-[var(--gray-700)] font-normal text-[8px] md:text-[16px]`}
              >{`Last updated | ${moment(
                userData?.data?.data?.updatedAt
              ).format("MMM, DD, YYYY")}`}</p>
            </div>
          </div>
          <div className="grid gap-2 px-2 py-4 md:py-6 border-b-2">
            <div className="flex items-center justify-between">
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-normal text-sm md:text-xl`}
              >
                Address
              </p>
              <CiCircleChevRight
                size={20}
                className="font-extralight hover:cursor-pointer"
                onClick={() => {
                  setModalData({
                    title: "Update your address",
                    inputs: [
                      {
                        label: "Address",
                        placeHolder: "City, street",
                        defaultValue: address
                          ? address
                          : userData?.data?.data?.address,
                        onChange: (e: any) => setAddress(e.target.value),
                      },
                    ],
                  });
                  setShowModal(true);
                }}
              />
            </div>
            <div>
              <p
                className={`${roboto.className} text-[var(--gray-800)] font-semibold text-sm md:text-xl`}
              >
                {!!address
                  ? address
                  : userData?.data?.data?.address || "No address"}
              </p>
              <p
                className={`${roboto.className} text-[var(--gray-700)] font-normal text-[8px] md:text-[16px]`}
              >{`Last updated | ${moment(
                userData?.data?.data?.updatedAt
              ).format("MMM, DD, YYYY")}`}</p>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <UpdateModal
          title={modalData.title}
          inputs={modalData.inputs}
          onSave={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </SideBar>
  );
}

export default Account;
