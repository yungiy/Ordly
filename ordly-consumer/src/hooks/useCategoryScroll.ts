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
      const y = ref.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTimeout(() => {
      isClickRef.current = false;
    }, 1000); // 스크롤 애니메이션 시간 동안 observer 비활성화
  };

  useEffect(() => {
    if (categoryHeaderRef.current) {
      setHeaderHeight(categoryHeaderRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!headerHeight) return; // 헤더 높이가 계산되기 전에 실행 방지

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
    categoryHeaderRef,
  };
}
