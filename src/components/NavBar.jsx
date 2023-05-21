import React from "react";
import { ImVideoCamera } from "react-icons/im";
const NavBar = () => {
  return (
    <div className="flex items-center justify-center w-full h-20 bg-nav-green gap-2 fixed">
      <ImVideoCamera size={50} className="text-nav-text" />
      <h1 className="text-nav-text text-center text-5xl">PlayBox</h1>
    </div>
  );
};

export default NavBar;
