import React from "react";
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Niimi Cosmetics",
  description: "Discover the story of Niimi Cosmetics. Rooted in Japanese skincare tradition, refined by modern science, and crafted with pure intention.",
};

export default function AboutPage() {
  return <AboutClient />;
}
