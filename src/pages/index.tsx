import { SideBar } from "@/components";
import PrintSummary from "@/components/dashboard/PrintSummary";
import OrderSummary from "@/components/dashboard/OrderSummary";
import { getSession, useSession } from "next-auth/react";
import { User } from "@/types";

export default function Home() {
  const session = useSession();
  const user = session?.data?.user as User;

  return (
    <SideBar>
      <div className="">
        {user?.role?.code !== "admin" ? <PrintSummary /> : <OrderSummary />}
      </div>
    </SideBar>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
