"use client";

import React from "react";

type LineProps = {
  variant: "one" | "two";
};

export const Line: React.FC<LineProps> = ({ variant }) => {
  return (
    <div
      className={`absolute h-[20px] w-[3px] rounded-[2px] bg-black transition-all duration-500 ${
        variant === "one"
          ? "top-[15px] left-[23px] rotate-45 group-hover:top-[10px] group-hover:h-[32px] group-hover:bg-[#DA135A]"
          : "top-[15px] left-[23px] -rotate-45 group-hover:top-[10px] group-hover:h-[32px] group-hover:bg-[#DA135A]"
      }`}
    />
  );
};

type CircleProps = {
  children: React.ReactNode;
  isDarkMode?: boolean;
};

export const Circle: React.FC<CircleProps> = ({ children, isDarkMode }) => {
  // On hover (via parent group) the background color toggles:
  // if dark mode is enabled, it becomes white; otherwise black.
  const hoverBgClass = isDarkMode
    ? "group-hover:bg-white"
    : "group-hover:bg-black";
  return (
    <div
      className={`w-[50px] h-[50px] bg-[#FFFAF0] m-auto shadow-[1px_1px_1px_#565656] relative transition-all duration-200 group-hover:origin-center ${hoverBgClass} group-hover:drop-shadow-[0_0_5px_white]`}
      style={{ transform: "scale(0.7)" }}
    >
      {children}
    </div>
  );
};

type ExitContainerProps = {
  onClick: () => void;
  isDarkMode?: boolean;
  children: React.ReactNode;
};

export const ExitContainer: React.FC<ExitContainerProps> = ({
  onClick,
  children,
  isDarkMode,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group fixed right-[1%] top-[1%] cursor-pointer flex justify-center items-center z-[9999] transition-transform duration-[30ms] ease-in-out ${
        isDarkMode
          ? "text-white hover:text-black"
          : "text-black hover:text-white"
      } max-[600px]:top-[5%]`}
    >
      {children}
    </div>
  );
};

type ExitIconProps = {
  onClose: () => void;
  isDarkMode?: boolean;
};

const ExitIcon: React.FC<ExitIconProps> = ({ onClose, isDarkMode }) => {
  return (
    <ExitContainer onClick={onClose} isDarkMode={isDarkMode}>
      <Circle isDarkMode={isDarkMode}>
        <Line variant="one" />
        <Line variant="two" />
      </Circle>
    </ExitContainer>
  );
};

export default ExitIcon;
