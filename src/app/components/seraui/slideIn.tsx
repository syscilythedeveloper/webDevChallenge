"use client";
import { motion } from "framer-motion";

const SlideInText = ({ text }: { text: string }) => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.03, ease: "easeOut" }}
          className="text-4xl md:text-5xl tracking-tight mb-4 text-[#334b35] drop-shadow inline-block"
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
