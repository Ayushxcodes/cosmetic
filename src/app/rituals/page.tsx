import React from "react";
import type { Metadata } from "next";
import RitualsClient from "./RitualsClient";

export const metadata: Metadata = {
  title: "Rituals | Niimi Cosmetics",
  description: "Explore our curated skincare and beauty rituals. Intentional steps crafted with rare botanicals and modern science for skin that glows from within.",
};

export default function RitualsPage() {
  return <RitualsClient />;
}
