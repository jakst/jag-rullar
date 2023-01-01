import { MutableRefObject, useEffect, useState } from "react";
import { DISPLAY_CARD_WIDTH } from "../constants";

export function useScrollContainer(ref: MutableRefObject<HTMLElement | null>) {
  const [scrollStatus, setScrollStatus] = useState<
    "forward" | "backward" | "both"
  >("forward");

  function moveLeft() {
    if (ref.current) scrollToNewCards(ref.current, true);
  }

  function moveRight() {
    if (ref.current) scrollToNewCards(ref.current);
  }

  useEffect(() => {
    const _element = ref.current;
    if (!_element) return;

    function onScroll(event: Event) {
      const element = event.currentTarget as HTMLElement;
      const maxScroll = element.scrollWidth - element.clientWidth;

      if (element.scrollLeft === 0) {
        setScrollStatus("forward");
      } else if (element.scrollLeft >= maxScroll) {
        setScrollStatus("backward");
      } else {
        setScrollStatus("both");
      }
    }

    _element.addEventListener("scroll", onScroll);
    return () => _element.removeEventListener("scroll", onScroll);
  });

  return { moveLeft, moveRight, scrollStatus };
}

/**
 * Calculates the appropriate distance to scroll so that all cards
 * that were previously in view are scrolled out of view, while
 * partially visible items are always scrolled into view.
 *
 * Always scrolls at least one full card.
 */
function scrollToNewCards(element: HTMLElement, backwards = false) {
  const scrollContainerWidth = element.clientWidth;

  const scrollDistance = Math.max(
    scrollContainerWidth - 0.5 * DISPLAY_CARD_WIDTH,
    DISPLAY_CARD_WIDTH,
  );

  element.scrollBy({
    left: backwards ? -scrollDistance : scrollDistance,
    behavior: "smooth",
  });
}
