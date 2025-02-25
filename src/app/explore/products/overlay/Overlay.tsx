import { Product } from "@/data/productsData";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPepperHot, FaSearch } from "react-icons/fa";
import { IoIosFlame } from "react-icons/io";

// A simple helper to parse product names.
function parseProductName(name: string) {
  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return { shortName: match[1].trim(), longName: match[2].trim() };
  }
  return { shortName: name, longName: name };
}

// Framer Motion variants for the info/popups.
const popupVariants = {
  hiddenLeft: { x: "-100vw", filter: "blur(15px)", opacity: 0 },
  hiddenRight: { x: "100vw", filter: "blur(15px)", opacity: 0 },
  visible: {
    x: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Header styling per product.
const productStyles: { [key: number]: { button: string; header: string } } = {
  1: {
    button: "from-red-700 via-yellow-400 to-black border-red-900",
    header: "text-red-700",
  },
  2: {
    button: "from-purple-600 to-red-600 border-purple-900",
    header: "text-purple-600",
  },
  3: {
    button: "from-yellow-400 via-orange-400 to-yellow-500 border-orange-500",
    header: "text-yellow-500",
  },
  4: { button: "bg-black border-gray-800", header: "text-black" },
  5: {
    button: "from-green-700 via-green-500 to-green-300 border-green-700",
    header: "text-green-700",
  },
};

// Tailwind mapping for 3D button variants.
const product3DButtonVariants: {
  [key: number]: { button: string; background: string };
} = {
  1: {
    button:
      "bg-gradient-to-r from-red-700 via-yellow-400 to-black border-2 border-red-900",
    background: "bg-gradient-to-r from-red-800 to-red-600",
  },
  2: {
    button:
      "bg-gradient-to-r from-purple-600 to-red-600 border-2 border-purple-900",
    background: "bg-gradient-to-r from-purple-700 to-purple-500",
  },
  3: {
    button:
      "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 border-2 border-orange-500",
    background: "bg-gradient-to-r from-yellow-500 to-orange-400",
  },
  4: { button: "bg-black border-2 border-gray-800", background: "bg-gray-700" },
  5: {
    button:
      "bg-gradient-to-r from-green-700 via-green-500 to-green-300 border-2 border-green-700",
    background: "bg-gradient-to-r from-green-800 to-green-500",
  },
};

// A reusable 3D button component using Tailwind CSS.
interface ThreeDButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonClasses: string;
  backgroundClasses: string;
}
function ThreeDButton({
  children,
  buttonClasses,
  backgroundClasses,
  ...props
}: ThreeDButtonProps) {
  // Destructure onDrag props to omit them, which fixes the type errors.
  const { onDrag, onDragStart, onDragEnd, ...restProps } = props;
  return (
    <div className="relative inline-block group">
      {/* Background layer simulating the 3D effect */}
      <motion.div
        className={`
          absolute inset-0 rounded-lg
          ${backgroundClasses}
          shadow-[0_0_0_2px] translate-y-3 
          transition-transform duration-150 ease-out
          group-active:shadow-[0_0_0_2px]
        `}
      />
      <button
        {...restProps}
        className={`
          relative rounded-lg border-2
          ${buttonClasses}
          transition-transform duration-150 ease-out
          group hover:translate-y-1 active:translate-y-[0.375rem]
        `}
      >
        {children}
      </button>
    </div>
  );
}

interface OverlayProps {
  toggleFlame: () => void;
  togglePeppers: () => void;
  currentProduct: Product;
  productsData: Product[];
  onSelectProduct: (id: number) => void;
}

export function Overlay({
  toggleFlame,
  togglePeppers,
  currentProduct,
  productsData,
  onSelectProduct,
}: OverlayProps) {
  const [activePanel, setActivePanel] = useState<"none" | "info" | "scoville">(
    "none",
  );

  const togglePanel = (panel: "info" | "scoville") => {
    setActivePanel(activePanel === panel ? "none" : panel);
  };

  return (
    <div className="relative z-50 pointer-events-auto">
      {/* Main overlay buttons */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 transition-all duration-300">
        <ThreeDButton
          onClick={() => togglePanel("scoville")}
          buttonClasses="bg-white px-2 py-2 w-auto"
          backgroundClasses="bg-gray-300"
        >
          <FaPepperHot className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
        </ThreeDButton>
        <ThreeDButton
          buttonClasses="bg-white py-2 px-4 whitespace-nowrap w-auto"
          backgroundClasses="bg-gray-300"
        >
          <span
            className="inline-flex items-center font-bold italic text-black text-sm sm:text-base whitespace-nowrap"
            style={{ textShadow: "0 0 0.2px black" }}
          >
            INSPECT{" "}
            <FaSearch className="text-black w-5 h-5 sm:w-6 sm:h-6 ml-2" />
          </span>
        </ThreeDButton>
        <ThreeDButton
          onClick={() => togglePanel("info")}
          buttonClasses="bg-white px-4 py-2 w-auto"
          backgroundClasses="bg-gray-300"
        >
          <span
            className="font-bold italic text-black text-sm sm:text-base whitespace-nowrap"
            style={{ textShadow: "0 0 0.2px black" }}
          >
            INFO
          </span>
        </ThreeDButton>
      </div>

      {/* Model selection buttons */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 transition-all duration-300">
        {productsData.map((product) => {
          const { shortName } = parseProductName(product.name);
          const variants = product3DButtonVariants[product.id];
          return (
            <ThreeDButton
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              buttonClasses={variants.button}
              backgroundClasses={variants.background}
            >
              <span
                className="font-bold italic text-sm"
                style={{ textShadow: "0 1px 1px black" }}
              >
                {shortName}
              </span>
            </ThreeDButton>
          );
        })}
      </div>

      {/* Additional toggle buttons */}
      <div className="fixed bottom-5 left-5 flex flex-col space-y-4 transition-all duration-300">
        <ThreeDButton
          onClick={toggleFlame}
          buttonClasses="bg-white"
          backgroundClasses="bg-gray-300"
        >
          <IoIosFlame className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" />
        </ThreeDButton>
      </div>
      <div className="fixed bottom-5 right-5 flex flex-col space-y-4 transition-all duration-300">
        <ThreeDButton
          onClick={togglePeppers}
          buttonClasses="bg-white"
          backgroundClasses="bg-gray-300"
        >
          <span
            className="font-bold italic text-sm sm:text-base"
            style={{
              background: "linear-gradient(45deg, red, orange, yellow)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <FaPepperHot className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
        </ThreeDButton>
      </div>

      {/* Info popup (right) */}
      {activePanel === "info" && (
        <motion.div
          className="fixed top-1/2 right-4 sm:right-10 bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs transition-all duration-300 z-50"
          variants={popupVariants}
          initial="hiddenRight"
          animate="visible"
        >
          <h2
            className={`text-xl sm:text-2xl font-bold mb-2 ${productStyles[currentProduct.id]?.header}`}
          >
            {parseProductName(currentProduct.name).longName}
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            {currentProduct.description}
          </p>
          <div className="mt-2 flex justify-center">
            {Array.from({ length: currentProduct.spiceLevel }).map((_, i) => {
              let color = "";
              switch (currentProduct.id) {
                case 1:
                  color = "orange";
                  break;
                case 2:
                  color = "yellow";
                  break;
                case 3:
                  color = "red";
                  break;
                case 4:
                  color = "black";
                  break;
                case 5:
                  color = "green";
                  break;
                default:
                  color = "gray";
              }
              return (
                <FaPepperHot
                  key={i}
                  style={{
                    color,
                    margin: "0 2px",
                    filter:
                      currentProduct.id === 4
                        ? "drop-shadow(0 0 1px white)"
                        : undefined,
                  }}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Scoville popup (left) */}
      {activePanel === "scoville" && (
        <motion.div
          className="fixed top-1/2 left-4 sm:left-10 bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs transition-all duration-300 z-50"
          variants={popupVariants}
          initial="hiddenLeft"
          animate="visible"
        >
          <h2
            className={`text-xl sm:text-2xl font-bold mb-2 ${productStyles[currentProduct.id]?.header}`}
          >
            {parseProductName(currentProduct.name).longName}
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            {currentProduct.scoville}
          </p>
          <div className="mt-2 flex justify-center">
            {Array.from({ length: currentProduct.spiceLevel }).map((_, i) => {
              let color = "";
              switch (currentProduct.id) {
                case 1:
                  color = "orange";
                  break;
                case 2:
                  color = "yellow";
                  break;
                case 3:
                  color = "red";
                  break;
                case 4:
                  color = "black";
                  break;
                case 5:
                  color = "green";
                  break;
                default:
                  color = "gray";
              }
              return (
                <FaPepperHot
                  key={i}
                  style={{
                    color,
                    margin: "0 2px",
                    filter:
                      currentProduct.id === 4
                        ? "drop-shadow(0 0 1px white)"
                        : undefined,
                  }}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export { ThreeDButton };
