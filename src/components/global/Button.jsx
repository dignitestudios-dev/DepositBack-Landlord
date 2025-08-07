import React from "react";
import { Link } from "react-router";

const Button = ({ text, link, className }) => {
  return (
    <Link
      to={link}
      className={`block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition ${className}`}
    >
      {text}
    </Link>
  );
};

export default Button;
