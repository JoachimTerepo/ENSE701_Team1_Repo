"use client";

import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();

  if (pathname === href) {
    return (
      <a href={href} className="px-4 text-neutral-500">
        {children}
      </a>
    );
  } else {
    return (
      <a href={href} className="px-4">
        {children}
      </a>
    );
  }
}
