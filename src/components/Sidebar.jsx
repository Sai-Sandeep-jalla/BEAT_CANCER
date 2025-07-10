import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sun } from "../assets";
import { navlinks } from "../constants";
import { IconHeartHandshake } from "@tabler/icons-react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] ${
      isActive === name ? "bg-[#2c2f32]" : ""
    } flex items-center justify-center ${
      !disabled ? "cursor-pointer" : ""
    } ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt={name}
      className={`h-6 w-6 ${isActive !== name && name !== "theme" ? "grayscale" : ""}`}
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      <Link to="/">
        <div className="rounded-[10px] bg-[#2c2f32] p-2">
          <IconHeartHandshake size={40} color="#1ec070" />
        </div>
      </Link>

      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={sun}
          name="theme"
          handleClick={toggleTheme}
        />
      </div>
    </div>
  );
};

export default Sidebar;