"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CinematicLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-sky-deep text-sky-paper"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.3 }} className="title-serif text-5xl italic md:text-7xl">
            Sore
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 1.4, delay: 0.9 }} className="scene-label mt-5">
            A love through time
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
