'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  containerId: string;
  children: React.ReactNode;
};

export default function Portal({ containerId, children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const foundContainer = document.getElementById(containerId);
    setContainer(foundContainer);
  }, [containerId]);

  if (!mounted || !container) {
    return null;
  }

  return createPortal(children, container);
}
