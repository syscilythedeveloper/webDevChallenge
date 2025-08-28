"use client";
import { motion } from "framer-motion";

const SlideInText = ({ text }: { text: string }) => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ x: -50, opacity: 0, filter: "blur(10px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
          className="bg-[#4c733a] bg-clip-text text-transparent text-4xl md:text-5xl tracking-tight mb-4 drop-shadow inline-block font-bold"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

const SlideInView = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col font-sans p-2">
      <SlideInText text={text} />
    </div>
  );
};

export default SlideInView;
