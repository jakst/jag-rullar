import NextLink from "next/link";
import { type ReactNode } from "react";
import { Link } from "vcc-ui";

interface Props {
  href: string;
  children: ReactNode;
}

export function A({ href, children }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link arrow="right">{children}</Link>
    </NextLink>
  );
}
