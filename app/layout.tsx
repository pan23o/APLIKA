import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APLIKA — Tu teórico, más claro",
  description: "Plataforma de preparación para el permiso de conducir en España."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}