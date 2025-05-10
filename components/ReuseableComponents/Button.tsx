"use client";
import React from "react";

const Button = ({
  text,
  variant,
  className,
  click,
}: {
  text: string;
  variant: "primary" | "danger";
  className?: string;
  click: () => void;
}) => {
  const baseStyle = "px-5 py-1 font-semibold rounded";
  const color =
    variant === "danger"
      ? "bg-red-400 text-white"
      : variant === "primary" && "bg-primary text-black";
  return (
    <button onClick={click} className={`${baseStyle} ${color} ${className}`}>
      {text}
    </button>
  );
};

export default Button;
