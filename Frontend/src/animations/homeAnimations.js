import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateHomePage = (containerRef) => {
  const el = containerRef.current;

  // 1. Hero Section (On Load)
  gsap.from(el.querySelector(".hero-content"), {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power4.out",
  });

  // 2. Why Section (Scroll Trigger)
  gsap.from(el.querySelectorAll(".feature-card"), {
    scrollTrigger: {
      trigger: el.querySelector(".why-section"),
      start: "top 80%", // जेव्हा सेक्शन ८०% स्क्रिनवर येईल
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    stagger: 0.2, // एकामागोमाग एक येण्यासाठी
    ease: "power2.out",
  });

  // 3. Comparison Section (Left to Right)
  gsap.from(el.querySelector(".traditional"), {
    scrollTrigger: {
      trigger: el.querySelector(".comparison-grid"),
      start: "top 70%",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(el.querySelector(".modern"), {
    scrollTrigger: {
      trigger: el.querySelector(".comparison-grid"),
      start: "top 70%",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
};