export const getScrollYPosition = (
  element: HTMLElement,
  headerHeight: number,
  scrollContainer: HTMLElement | null = null
): number => {
  if (scrollContainer) {
    return element.offsetTop - headerHeight;
  }
  return element.getBoundingClientRect().top + window.scrollY - headerHeight;
};
