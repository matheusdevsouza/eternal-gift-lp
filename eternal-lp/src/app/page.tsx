"use client";

import dynamic from "next/dynamic";

const EternalLanding = dynamic(
  () => import("@/components/landing/EternalLanding"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <EternalLanding />
    </main>
  );
}
