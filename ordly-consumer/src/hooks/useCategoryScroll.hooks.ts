'use client';

import { getScrollYPosition } from '@/utils/scroll';
import { useState, useRef, useEffect, RefObject, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export function useCategoryScroll(
  categories: string[],
  scrollContainerRef?: RefObject<HTMLElement | null>
) {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const isClickRef = useRef(false);
  const categoryHeaderRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const scrollContainer = scrollContainerRef?.current;
  const { scrollY } = useScroll({ container: scrollContainerRef as RefObject<HTMLElement> });

  const handleCategoryClick = (category: string) => {
    isClickRef.current = true;
    setActiveCategory(category);
    const ref = categoryRefs.current[category];
    if (ref) {
      const y = getScrollYPosition(ref, headerHeight, scrollContainer);
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setTimeout(() => {
      isClickRef.current = false;
    }, 1000); 
  };

  useEffect(() => {
    const headerEl = categoryHeaderRef.current;
    if (!headerEl) return;

    const observer = new ResizeObserver(() => {
      const currentHeaderHeight = headerEl.offsetHeight;
      if (currentHeaderHeight > 0) {
        setHeaderHeight(currentHeaderHeight);
      }
    });

    observer.observe(headerEl);
    return () => observer.disconnect();
  }, []);

  const categoryTops = useRef<{ name: string; top: number }[]>([]);

  const calculateCategoryTops = useCallback(() => {
    if (!headerHeight || Object.keys(categoryRefs.current).length === 0 || Object.keys(categoryRefs.current).length !== categories.length) {
      return;
    }

    const tops = categories
      .map((name) => {
        const el = categoryRefs.current[name];
        if (!el) return null;
        const top = getScrollYPosition(el, headerHeight, scrollContainer);
        return { name, top };
      })
      .filter((v): v is { name: string; top: number } => v !== null)
      .sort((a, b) => a.top - b.top);

    categoryTops.current = tops;
  }, [categories, headerHeight, scrollContainer]);

  useEffect(() => {
    const timeoutId = setTimeout(calculateCategoryTops, 100);
    return () => clearTimeout(timeoutId);
  }, [calculateCategoryTops]);

  useEffect(() => {
    const target = scrollContainer || document.documentElement;
    const observer = new ResizeObserver(() => {
      calculateCategoryTops();
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [scrollContainer, calculateCategoryTops]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (isClickRef.current || categoryTops.current.length === 0) return;

    const containerHeight = scrollContainer ? scrollContainer.clientHeight : window.innerHeight;
    const offset = containerHeight * 0.2; // 컨테이너 높이의 20%를 오프셋으로 사용

    for (let i = categoryTops.current.length - 1; i >= 0; i--) {
      const { name, top } = categoryTops.current[i];
      if (latest >= top - offset) {
        setActiveCategory(name);
        break;
      }
    }
  });

  return {
    activeCategory,
    handleCategoryClick,
    categoryRefs,
    categoryHeaderRef,
  };
}
