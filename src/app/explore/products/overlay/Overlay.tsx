import { Product } from "@/data/productsData";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPepperHot, FaSearch } from "react-icons/fa";
import { IoIosFlame } from "react-icons/io";

interface OverlayProps {
  toggleFlame: () => void;
  togglePeppers: () => void;
  currentProduct: Product;
  productsData: Product[];
  onSelectProduct: (id: number) => void;
}

const productStyles: { [key: number]: { button: string; header: string } } = {
  1: {
    button:
      "bg-gradient-to-r from-red-700 via-yellow-400 to-black border border-red-900",
    header: "text-red-700",
  },
  2: {
    button:
      "bg-gradient-to-r from-purple-600 to-red-600 border border-purple-900",
    header: "text-purple-600",
  },
  3: {
    button:
      "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 border border-orange-500",
    header: "text-yellow-500",
  },
  4: {
    button: "bg-black border border-gray-800",
    header: "text-black",
  },
  5: {
    button:
      "bg-gradient-to-r from-green-700 via-green-500 to-green-300 border border-green-700",
    header: "text-green-700",
  },
};

function parseProductName(name: string) {
  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return { shortName: match[1].trim(), longName: match[2].trim() };
  }
  return { shortName: name, longName: name };
}

const popupVariants = {
  hiddenLeft: {
    x: "-100vw",
    filter: "blur(15px)",
    opacity: 0,
  },
  hiddenRight: {
    x: "100vw",
    filter: "blur(15px)",
    opacity: 0,
  },
  visible: {
    x: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

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
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4 transition-all duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => togglePanel("scoville")}
          className="bg-white p-4 rounded-full shadow-md"
        >
          <FaPepperHot className="text-red-500" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white p-4 rounded-full shadow-md flex items-center space-x-1"
        >
          <span
            className="font-bold italic text-black"
            style={{ textShadow: "0 0 0.2px black" }}
          >
            INSPECT
          </span>
          <FaSearch className="text-black" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => togglePanel("info")}
          className="bg-white p-4 rounded-full shadow-md"
        >
          <span
            className="font-bold italic text-white"
            style={{ textShadow: "0 0 0.2px black" }}
          >
            INFO
          </span>
        </motion.button>
      </div>

      {/* Model selection buttons */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 transition-all duration-300">
        {productsData.map((product) => {
          const styles = productStyles[product.id];
          const { shortName } = parseProductName(product.name);
          const isSelected = product.id === currentProduct.id;
          return (
            <motion.button
              key={product.id}
              whileHover={{ scale: 1.1 }}
              onClick={() => onSelectProduct(product.id)}
              className={`${styles.button} text-white rounded-md px-4 transition-all duration-300`}
              style={{
                height: "25px",
                fontWeight: "bold",
                fontSize: "15px",
                fontStyle: "italic",
                textShadow: "0 1px 1px black",
                boxShadow: isSelected
                  ? "0 0 10px 2px rgba(255,255,0,0.8)"
                  : "none",
              }}
            >
              {shortName}
            </motion.button>
          );
        })}
      </div>

      {/* Additional toggle buttons */}
      <div className="fixed bottom-5 left-5 flex flex-col space-y-4 transition-all duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white p-4 rounded-full shadow-md"
          onClick={toggleFlame}
        >
          <IoIosFlame className="text-orange-500" />
        </motion.button>
      </div>
      <div className="fixed bottom-5 right-5 flex flex-col space-y-4 transition-all duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white p-4 rounded-full shadow-md"
          onClick={togglePeppers}
        >
          <span
            className="font-bold italic"
            style={{
              background: "linear-gradient(45deg, red, orange, yellow)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <FaPepperHot />
          </span>
        </motion.button>
      </div>

      {/* Info popup (right) */}
      {activePanel === "info" && (
        <motion.div
          className="fixed top-1/2 right-10 bg-white p-6 rounded-lg shadow-lg max-w-xs transition-all duration-300 z-50"
          variants={popupVariants}
          initial="hiddenRight"
          animate="visible"
        >
          <h2
            className={`text-2xl font-bold mb-2 ${productStyles[currentProduct.id]?.header}`}
          >
            {parseProductName(currentProduct.name).longName}
          </h2>
          <p className="mt-2 text-gray-600">{currentProduct.description}</p>
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
                />
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Scoville popup (left) */}
      {activePanel === "scoville" && (
        <motion.div
          className="fixed top-1/2 left-10 bg-white p-6 rounded-lg shadow-lg max-w-xs transition-all duration-300 z-50"
          variants={popupVariants}
          initial="hiddenLeft"
          animate="visible"
        >
          <h2
            className={`text-2xl font-bold mb-2 ${productStyles[currentProduct.id]?.header}`}
          >
            {parseProductName(currentProduct.name).longName}
          </h2>
          <p className="mt-2 text-gray-600">{currentProduct.scoville}</p>
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
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
