'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = { containerId?: string; children: React.ReactNode };

export default function Portal({ containerId = 'modal-root', children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setContainer(document.getElementById(containerId));
  }, [containerId]);

  if (!mounted || !container) return null;
  return createPortal(children, container);
}
