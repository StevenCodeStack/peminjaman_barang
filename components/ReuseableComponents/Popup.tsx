import React from "react";

const Popup = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${
        open ? "top-0" : "top-[-100%]"
      } h-screen w-screen flex justify-center items-center fixed right-0 bg-slate-950/80 z-2 transition-all`}
    >
      {children}
    </div>
  );
};

export default Popup;
