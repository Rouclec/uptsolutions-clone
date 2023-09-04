import React from "react";
import { useRouter } from "next/router";
import { dm_sans } from "@/pages/_app";

const BreadCrumbs: React.FC = () => {
  const router = useRouter();
  const id = router.query?.id;

  const capitalize = (str: string) => {
    if (str === `[id]`) return id;
    const lower = str.toLowerCase().split("-").join(" ");
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  let crumbs = router.pathname.split("/") as any;
  crumbs = crumbs.slice(1, crumbs.length);
  let token = "";

  crumbs = crumbs.map((crumb: any) => {
    return {
      name: capitalize(crumb),
      path: crumb,
    };
  });

  const last = crumbs.pop() as any;

  return (
    <div>
      <div
        arial-aria-label="breadcrumbs"
        className="h3 text-[var(--primary-50)]"
      >
        {crumbs.map((crumb: any, i: number) => {
          return (
            <span
              onClick={() => {
                const clicked = crumbs.slice(0, i + 1);
                const path = clicked
                  .map((crumb: any) => {
                    if (crumb.path === `[id]`) return crumb.name;
                    if (crumb.path === `[paymentId]`) return crumb.name;
                    return crumb.path;
                  })
                  .join("/");
                router.push(`/${path}`);
              }}
              key={i}
              className={`text-[var(--primary-400)] ${dm_sans.className} text-2xl no-underline hover:cursor-pointer`}
            >
              {crumb.name}
              {">"}{" "}
            </span>
          );
        })}
        <span
          key={"last"}
          className={`no-underline text-[var(--primary-600)] ${dm_sans.className} text-2xl  hover:cursor-not-allowed`}
        >
          {last.name}
        </span>
      </div>
    </div>
  );
};

export default BreadCrumbs;
