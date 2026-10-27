"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/icon";

// Remounting on route changes also resets the disclosure on history navigation.
export function SiteNavigation() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}

function Navigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 72rem)");
    let navigationHadFocus = nav.current?.contains(document.activeElement) ?? false;
    let toggleHadFocus = document.activeElement === toggle.current;
    function rememberFocus(event: FocusEvent) {
      // Hiding the desktop links can blur them before the media-query event.
      // Keep their last focus state when the browser falls back to the body.
      if (event.target !== document.body && event.target instanceof Node) {
        navigationHadFocus = nav.current?.contains(event.target) ?? false;
        toggleHadFocus = event.target === toggle.current;
      }
    }
    function rememberPointer(event: PointerEvent) {
      if (event.target instanceof Node && !nav.current?.contains(event.target)) navigationHadFocus = false;
      if (event.target instanceof Node && !toggle.current?.contains(event.target)) toggleHadFocus = false;
    }
    function onBreakpointChange(event: MediaQueryListEvent) {
      setOpen(false);
      if (!event.matches && (navigationHadFocus || nav.current?.contains(document.activeElement))) {
        toggle.current?.focus({ preventScroll: true });
      } else if (event.matches && (toggleHadFocus || document.activeElement === toggle.current)) {
        const destination = nav.current?.querySelector<HTMLElement>('a[aria-current="page"]') ?? nav.current?.querySelector<HTMLElement>("a");
        destination?.focus({ preventScroll: true });
      }
    }
    document.addEventListener("focusin", rememberFocus);
    document.addEventListener("pointerdown", rememberPointer);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("focusin", rememberFocus);
      document.removeEventListener("pointerdown", rememberPointer);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus({ preventScroll: true });
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        setOpen(false);
        if (container.current?.contains(document.activeElement)) toggle.current?.focus({ preventScroll: true });
      }
    }
    function onFocusIn(event: FocusEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <div className="site-navigation" ref={container} data-open={open}>
      <button className="button button--secondary menu-toggle" ref={toggle} type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <Icon name={open ? "close" : "menu"} /><span>{open ? "Fechar" : "Menu"}</span>
      </button>
      <nav id="primary-navigation" ref={nav} aria-label="Navegação principal">
        <ul className="nav-list">
          {siteConfig.navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} onNavigate={() => {
                if (open) {
                  setOpen(false);
                  document.getElementById("conteudo")?.focus({ preventScroll: true });
                }
              }}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
