"use client";

import { useGesture } from "@use-gesture/react";
import { useRef } from "react";
import { animated, to, useSpring } from "react-spring";

interface HoverEffectProps {
  className?: string;
  children?: React.ReactNode;
}

const HoverEffect = ({ className = "", children }: HoverEffectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ rotateX, rotateY, rotateZ, scale, zIndex }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zIndex: 0,
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }));

  useGesture(
    {
      onMove: ({ event: { clientX, clientY } }) => {
        if (!ref.current) return;
        const { top, left, height, width } =
          ref.current.getBoundingClientRect();

        api({
          rotateX: -(clientY - (top + height / 2)) / 15,
          rotateY: (clientX - (left + width / 2)) / 15,
          scale: 1.2,
          zIndex: 10,
        });
      },
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1, zIndex: 0 }),
    },
    { target: ref, eventOptions: { passive: false } },
  );
  return (
    <animated.div
      ref={ref}
      className={`${className} aspect-square overflow-hidden rounded-lg hover:shadow-lg`}
      style={{
        transform: "perspective(600px)",
        scale,
        rotateX,
        rotateY,
        rotateZ,
        zIndex: to([zIndex], (z) => Math.floor(z)),
      }}
    >
      {children}
    </animated.div>
  );
};
export default HoverEffect;
