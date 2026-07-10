"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, ArrowUpLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS, COMPANY } from "@/lib/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (!open) return;
    // Close when pathname changes (navigation occurred)
    const timeout = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [pathname, open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-5"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300",
            scrolled ? "glass-strong shadow-2xl shadow-black/40" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-md group-hover:bg-primary/50 transition-colors" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 border border-primary/40">
                <Terminal className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-extrabold tracking-tight">NEXUS<span className="text-primary">DEV</span></span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-widest">{COMPANY.taglineEn}</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive(link.href)
                    ? "text-foreground bg-white/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 right-1/2 translate-x-1/2 h-0.5 w-6 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY.phoneEG.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              dir="ltr"
            >
              <Phone className="h-3.5 w-3.5" />
              {COMPANY.phoneEG}
            </a>
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-1.5 shadow-lg shadow-primary/20"
            >
              <Link href="/contact">
                ابدأ مشروعك
                <ArrowUpLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col p-3 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-xl text-center"
                >
                  ابدأ مشروعك الآن
                </Link>
                <a
                  href={`tel:${COMPANY.phoneEG.replace(/\s/g, "")}`}
                  className="mt-1 px-4 py-3 text-sm text-muted-foreground text-center flex items-center justify-center gap-2"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY.phoneEG}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
