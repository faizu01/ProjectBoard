import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [logBtn, setLogBtn] = useState("Login");
  const [signBtn, setSignBtn] = useState("Sign up");

  return (
    <div className="h-16 items-center flex justify-between bg-slate-200 text-black sticky">
      <img
        src={require("../../assets/img/Logo.png")}
        className="w-1/6 h-auto hover:scale-110 transition-transform duration-300"
        alt="Logo"
      />

      {/* <div className="font-bold text-lg">Project Board</div> */}
      <div className="font-bold text-lg flex mx-2">
        <button
          className="mx-2  text-black rounded-lg w-12 h-12 items-center justify-center"
          onClick={() => {
            logBtn === "Login" ? setLogBtn("Logout") : setLogBtn("Login");
          }}
        >
          {logBtn}
        </button>
        <button
          className={`mx-4 bg-black text-white rounded-full w-20 h-12 items-center justify-center ${
            signBtn === "Sign out"
          }`}
          onClick={() => {
            signBtn === "Sign out"
              ? setSignBtn("Sign up")
              : setSignBtn("Sign out");
          }}
        >
          {signBtn}
        </button>
      </div>
    </div>
  );
};

export default Header;
