import React from "react";
import BreadCrumbs from "./Breadcrumbs.component";
type Props = {
  children?: any;
};
const Header: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-[var(--primary-100)] w-100vw md:w-[calc(100vw-300px)] fixed pr-10 left-0 md:left-[300px] top-20 right-0 md:right-[300px] grid gap-4 px-10 items-center">
      <BreadCrumbs />
      <div>{children}</div>
    </div>
  );
};

export default Header;
