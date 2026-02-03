"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = "up",
}: ScrollRevealProps) {
    const getDirectionVariants = () => {
        const distance = 40;
        switch (direction) {
            case "up":
                return { hidden: { y: distance, opacity: 0 }, visible: { y: 0, opacity: 1 } };
            case "down":
                return { hidden: { y: -distance, opacity: 0 }, visible: { y: 0, opacity: 1 } };
            case "left":
                return { hidden: { x: -distance, opacity: 0 }, visible: { x: 0, opacity: 1 } };
            case "right":
                return { hidden: { x: distance, opacity: 0 }, visible: { x: 0, opacity: 1 } };
            case "none":
            default:
                return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
        }
    };

    const variants = getDirectionVariants();

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }} // Animate every time it enters view, with a slight offset
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
            }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
