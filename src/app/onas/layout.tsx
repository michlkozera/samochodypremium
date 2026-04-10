import type { ReactNode } from 'react';

export default function OnasLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
