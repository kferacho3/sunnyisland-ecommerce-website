"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CTA, nav } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Mobile navigation. One of only four client islands on the site.
 *
 * Handles focus trapping, Escape, scroll lock, and returning focus to the
 * trigger on close — the old Sidebar did none of these.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      (previouslyFocused ?? triggerRef.current)?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-on-ink md:hidden"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="relative block h-4 w-6">
          <span
            className={cn(
              "absolute left-0 block h-px w-6 bg-current transition-all duration-medium ease-si",
              open ? "top-2 rotate-45" : "top-0.5",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-fast ease-si",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-px w-6 bg-current transition-all duration-medium ease-si",
              open ? "top-2 -rotate-45" : "top-[0.9375rem]",
            )}
          />
        </span>
      </button>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-header z-nav border-b border-ink-line bg-ink px-gutter pb-8 pt-4 md:hidden"
      >
        <nav aria-label="Primary mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-ink-line py-4 font-display text-title text-on-ink transition-colors duration-fast ease-si hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={CTA.href}
            className="mt-6 inline-flex min-h-[3.25rem] items-center justify-center rounded-pill bg-gold px-7 font-body font-semibold text-ink"
          >
            {CTA.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
