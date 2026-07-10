import type { Metadata } from "next";
import { Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NEXUS DEV | شركة تطوير البرمجيات وتطبيقات الويب والجوال",
  description: "نكسوس ديف — شركة هندسة برمجيات متخصصة في تطوير تطبيقات الويب والجوال، وبيع قوالب أكواد جاهزة باك إند وفرونت إند بمعايير عالمية.",
  keywords: ["تطوير ويب", "تطوير موبايل", "قوالب جاهزة", "باك إند", "فرونت إند", "Next.js", "React Native", "هندسة برمجيات"],
  authors: [{ name: "NEXUS DEV" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "NEXUS DEV | هندسة برمجيات بمعايير عالمية",
    description: "تطوير تطبيقات الويب والجوال + قوالب أكواد جاهزة باك إند وفرونت إند",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="dark">
      <body
        className={`${cairo.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
