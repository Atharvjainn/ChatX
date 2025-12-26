"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const texts = [
  "Hello ",
  "Welcome to ChatX ",
  "Start chatting now ",
];

export default function AnimatedSearchBox() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-sm text-2xl  ">
      <Input
       disabled
        className="h-15 border-none"
      />

      <div className="absolute inset-0 flex items-center px-4 pointer-events-none justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[index]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-b
  from-[#2b6cff]
  via-[#6a7cff]
  to-[#ff6fb1]
  bg-clip-text
  text-transparent"
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
