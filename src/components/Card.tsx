import type { JSX } from "astro/jsx-runtime";

export default function Card({ children }: { children: JSX.Element }) {
  return (
    <div class="border-2 border-black p-4">
      {children}
    </div>
  );
}
