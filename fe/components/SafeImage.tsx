"use client";
import Image from "next/image";
import { ComponentProps } from "react";

// Safe Image component that strips fetchPriority prop
export default function SafeImage(props: ComponentProps<typeof Image> & { fetchPriority?: any }) {
  // Destructure fetchPriority agar tidak dikirim ke Image
  const { fetchPriority, style, ...rest } = props;
  const mergedStyle = { width: "auto", height: "auto", ...style };
  return <Image {...rest} style={mergedStyle} />;
}
