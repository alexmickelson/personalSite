import { FC, useState } from "react";
import { NavbarBlog } from "./NavbarBlog";

export const MobileNavbar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="
        fixed 
        bottom-2
        right-2
        md:hidden

        transition 
        duration-300
      "
      >
        {!show && <Icon onClick={() => setShow(true)} />}
      </div>
      {show && (
        <nav
          className="
          fixed 
          bottom-0
          right-0

          px-3 
          ml-4 
          mr-0

          bg-gray-50 
          rounded-tl-lg 
          dark:bg-bg-500 
          outline
          outline-bg-400 
          outline-1 
          shadow 
          drop-shadow-xl 
          "
        >
          <NavbarBlog />
          <hr />
          <div className="p-3 m-3">
            <button
              className="
                w-full 
                bg-bg-700
                outline
                rounded
                hover:bg-bg-500
              "
              onClick={() => setShow(false)}
            >
              close
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

const Icon: FC<{ onClick: () => void }> = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="
      border-2
      border-primary 
      rounded-lg
      bg-bg-400
      fill-otherSecondary

      hover:bg-bg-200
      hover:border-dark
      hover:fill-dark
      transition
      duration-300
    "
    width="4rem"
    height="4rem"
    viewBox="0 0 32 32"
    enable-background="new 0 0 32 32"
    id="Glyph"
    version="1.1"
  >
    <path
      d="M26,16c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,14,26,14.896,26,16z"
      id="XMLID_314_"
    />
    <path
      d="M26,8c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,6,26,6.896,26,8z"
      id="XMLID_315_"
    />
    <path
      d="M26,24c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,22,26,22.896,26,24z"
      id="XMLID_316_"
    />
  </svg>
);
