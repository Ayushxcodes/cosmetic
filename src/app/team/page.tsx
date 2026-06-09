import React from "react";
import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Team | Niimi Cosmetics",
  description: "Meet the founders and team behind Niimi Cosmetics. Driven by economics, e-commerce expertise, and a passion for affordable luxury.",
};

export default function TeamPage() {
  return <TeamClient />;
}
