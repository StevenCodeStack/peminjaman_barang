"use client";
import React from "react";

const Button = ({
  text,
  variant,
  className,
  disabledState,
  click,
}: {
  text: string;
  variant: "primary" | "danger";
  className?: string;
  disabledState?: boolean | null;
  click: () => void;
}) => {
  const baseStyle = "px-5 py-1 font-semibold rounded w-fit h-fit";
  const color =
    variant === "danger"
      ? "bg-red-400 text-white disabled:bg-red-200"
      : variant === "primary" && "bg-primary text-black disabled:bg-green-200";
  return (
    <button
      type="button"
      onClick={click}
      className={`${baseStyle} ${color} ${className} `}
      disabled={disabledState || false}
    >
      {text}
    </button>
  );
};

export default Button;
