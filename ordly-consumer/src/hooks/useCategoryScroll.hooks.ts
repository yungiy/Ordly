'use client';

import { useState, useRef, useEffect } from 'react';

export function useCategoryScroll(categories: string[]) {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isClickRef = useRef(false);
  const categoryHeaderRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const handleCategoryClick = (category: string) => {
    isClickRef.current = true;
    setActiveCategory(category);
    const ref = categoryRefs.current[category];
    if (ref) {
      const y = ref.getBoundingClientRect().top + window.scrollY - headerHeight - 25;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTimeout(() => {
      isClickRef.current = false;
    }, 1000); 
  };

  useEffect(() => {
    if (categoryHeaderRef.current) {
      setHeaderHeight(categoryHeaderRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!headerHeight) return; 

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isClickRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0.1,
    });

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [categories, headerHeight]);

  return {
    activeCategory,
    handleCategoryClick,
    categoryRefs,
    // 생성된 ref를 반환하여 Category 컴포넌트에 전달할 수 있도록 합니다.
    categoryHeaderRef,
  };
}
