import { Product } from "@/data/productsData";
import { motion } from "framer-motion";
import { FaPepperHot } from "react-icons/fa";

interface ComingSoonPopupProps {
  product: Product;
  onClose: () => void;
}

const productStyles: { [key: number]: { button: string; header: string } } = {
  1: {
    button: "bg-gradient-to-r from-red-700 via-yellow-400 to-black",
    header: "text-red-700",
  },
  2: {
    button: "bg-gradient-to-r from-purple-600 to-red-600",
    header: "text-purple-600",
  },
  3: {
    button: "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500",
    header: "text-yellow-500",
  },
  4: {
    button: "bg-black",
    header: "text-black",
  },
  5: {
    button: "bg-gradient-to-r from-green-700 via-green-500 to-green-300",
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
  hidden: {
    y: "100vh",
    filter: "blur(15px)",
    opacity: 0,
  },
  visible: {
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

export const ComingSoonPopup = ({ product, onClose }: ComingSoonPopupProps) => {
  const { shortName } = parseProductName(product.name);
  const gradient = productStyles[product.id]?.button || "bg-gray-500";
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40"
      onClick={onClose}
      initial="hidden"
      animate="visible"
      variants={popupVariants}
    >
      <div
        className={`p-8 text-center ${gradient} bg-clip-text text-transparent`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-6xl font-extrabold italic mb-4"
          style={{ WebkitTextStroke: "0.2px white" }}
        >
          {shortName} COMING SOON!
        </h2>
        <p className="text-xl text-white">Scoville: {product.scoville}</p>
        <div className="mt-2 flex justify-center">
          {Array.from({ length: product.spiceLevel }).map((_, i) => {
            let color = "";
            switch (product.id) {
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
                    product.id === 4 ? "drop-shadow(0 0 1px white)" : undefined,
                }}
              />
            );
          })}
        </div>
        <button
          className="mt-4 bg-white text-black px-6 py-2 transition-all duration-300 font-bold italic"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};
