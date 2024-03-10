import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [logBtn, setLogBtn] = useState("Login");

  return (
    <div className="h-16 items-center flex justify-between bg-black text-white sticky">
      <div className="font-bold text-lg m-2">Logo</div>
      <div className="font-bold text-lg">Project Board</div>
      <div className="font-bold text-lg">
        <button
        className="mx-2 bg-white text-black rounded-full w-16"
          onClick={() => {
            logBtn === "Login" ? setLogBtn("Logout") : setLogBtn("Login");
          }}
        >
          {logBtn}
        </button>
      </div>
    </div>
  );
};

export default Header;
