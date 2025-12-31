"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ROLES = [
    "Full Stack Software Engineer",
    "Generative AI Engineer",
    "Supply Chain System Engineer",
];

export function RoleRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % ROLES.length);
        }, 2800); // calm, premium pace
        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative h-[1.4em] w-full">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute left-0 top-0 font-semibold text-[#4338CA] dark:text-[#5EEAD4] whitespace-nowrap pr-10"
                >
                    {ROLES[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
