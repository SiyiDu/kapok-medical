"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { nav } from "@/site.config";
import { cx } from "./ui";

function useIsActive() {
  const pathname = (usePathname() || "/").replace(/\/$/, "") || "/";
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const isActive = useIsActive();
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
      {nav.map((item) => {
        const active = isActive(item.href);
        return (
          <NextLink
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cx(
              "rounded-full px-3 py-1.5 text-sm",
              active ? "bg-default text-foreground" : "text-muted transition-colors hover:text-foreground",
            )}
          >
            {item.label}
          </NextLink>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = useIsActive();
  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Button isIconOnly aria-label="Open menu" variant="ghost" onPress={() => setIsOpen(true)}>
        <Bars />
      </Button>
      <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Menu</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav aria-label="Main" className="flex flex-col gap-1">
                {nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <NextLink
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "rounded-2xl px-3 py-2.5",
                        active ? "bg-surface-secondary text-foreground" : "text-muted",
                      )}
                    >
                      {item.label}
                    </NextLink>
                  );
                })}
              </nav>
            </Drawer.Body>
            <Drawer.Footer>
              <NextLink href="/contact" onClick={close} className={buttonVariants({ fullWidth: true })}>
                Start an Inquiry
              </NextLink>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </div>
  );
}
