"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(null);

  // keep your scroll effect
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) imageElement.classList.add("scrolled");
      else imageElement.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // pointer-follow + glow + sheen
  useEffect(() => {
    const frame = frameRef.current;
    const media = videoRef.current;
    if (!frame || !media) return;

    // disable pointer-follow on touch devices; show subtle glow instead
    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouch) {
      frame.style.setProperty("--g-int", "0.35");
      return;
    }

    try {
      const intensity = { translate: 20, rotate: 6 };
      const damping = 0.12;

      let bounds = frame.getBoundingClientRect();
      let target = { tx: 0, ty: 0, rx: 0, ry: 0 };
      let current = { tx: 0, ty: 0, rx: 0, ry: 0 };
      let rafId = null;

      const updateBounds = () => (bounds = frame.getBoundingClientRect());

      const setGlowPos = (clientX, clientY) => {
        const gx = Math.max(0, Math.min(100, ((clientX - bounds.left) / bounds.width) * 100));
        const gy = Math.max(0, Math.min(100, ((clientY - bounds.top) / bounds.height) * 100));
        frame.style.setProperty("--gx", `${gx}%`);
        frame.style.setProperty("--gy", `${gy}%`);
        frame.style.setProperty("--g-int", "1");
      };

      const onPointerMove = (e) => {
        const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
        const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
        if (!bounds) updateBounds();

        const nx = (clientX - bounds.left) / bounds.width - 0.5;
        const ny = (clientY - bounds.top) / bounds.height - 0.5;

        target.tx = nx * intensity.translate * 2;
        target.ty = ny * intensity.translate * 2;
        target.rx = -ny * intensity.rotate;
        target.ry = nx * intensity.rotate;

        setGlowPos(clientX, clientY);
      };

      const onPointerLeave = () => {
        target = { tx: 0, ty: 0, rx: 0, ry: 0 };
        frame.style.setProperty("--g-int", "0.25");
      };

      const tick = () => {
        current.tx += (target.tx - current.tx) * damping;
        current.ty += (target.ty - current.ty) * damping;
        current.rx += (target.rx - current.rx) * damping;
        current.ry += (target.ry - current.ry) * damping;

        const transform = `translate3d(${current.tx.toFixed(2)}px, ${current.ty.toFixed(2)}px, 0) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`;
        media.style.transform = transform;

        rafId = requestAnimationFrame(tick);
      };

      frame.addEventListener("pointermove", onPointerMove);
      frame.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("resize", updateBounds);

      updateBounds();
      frame.style.setProperty("--g-int", "0.35"); // visible by default
      rafId = requestAnimationFrame(tick);

      return () => {
        frame.removeEventListener("pointermove", onPointerMove);
        frame.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("resize", updateBounds);
        if (rafId) cancelAnimationFrame(rafId);
        if (media) media.style.transform = "";
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Pointer-follow init failed:", err);
    }
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 relative overflow-hidden">
      <div className="space-y-6 text-center relative z-10">
        <div className="space-y-6 mx-auto">
          <motion.h3
            className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl 
                       bg-gradient-to-r from-[#FF9933] via-white to-[#138808] 
                       bg-clip-text text-transparent animate-gradient-slow 
                       tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            From Skill Tests to Job-Ready Resumes — Your AI Career Companion Is
            Here.
          </motion.h3>

          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>

        {/* video frame with glow vars set inline */}
        <div
          ref={frameRef}
          className="relative w-full max-w-[1280px] h-[520px] mx-auto overflow-hidden rounded-lg shadow-2xl border mt-8 dark:shadow-none"
          style={{
            "--gx": "50%",
            "--gy": "50%",
            "--g-int": 0.35,
          }}
        >
          <video
            ref={videoRef}
            src="/WhatsApp Video 2025-11-17 at 03.20.43_3bf5a9f3.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="glow-overlay pointer-events-none" aria-hidden="true" />
          <div className="sheen pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
