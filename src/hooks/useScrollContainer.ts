import { MutableRefObject, useEffect, useState } from "react";
import { DISPLAY_CARD_WIDTH } from "../constants";

export function useScrollContainer(ref: MutableRefObject<HTMLElement | null>) {
  const [forwardsEnabled, setForwardsEnabled] = useState(false);
  const [backwardsEnabled, setBackwardsEnabled] = useState(false);

  function onChange(element: Element) {
    const maxScroll = element.scrollWidth - element.clientWidth;

    if (element.clientWidth === element.scrollWidth) {
      // Scroll container is the same width as the content
      setForwardsEnabled(false);
      setBackwardsEnabled(false);
    } else if (element.scrollLeft === 0) {
      // The scroll is fully to the left
      setForwardsEnabled(true);
      setBackwardsEnabled(false);
    } else if (element.scrollLeft + 5 >= maxScroll) {
      // The scroll is withing 5 pixels of the end
      // (padded with 5px because some browsers never make the scrollLeft value
      //   go all the way)
      setForwardsEnabled(false);
      setBackwardsEnabled(true);
    } else {
      // The scroll is somewhere in the middle
      setForwardsEnabled(true);
      setBackwardsEnabled(true);
    }
  }

  useEffect(() => {
    const _element = ref.current;
    if (!_element) return;

    // Measure once on page load, then rely on scroll and resize events
    onChange(_element);

    function onScrollChange(event: Event) {
      const element = event.currentTarget as Element;
      onChange(element);
    }

    const resizeObserver = new ResizeObserver((entries) =>
      onChange(entries[0].target),
    );

    _element.addEventListener("scroll", onScrollChange);
    resizeObserver.observe(_element);

    return () => {
      _element.removeEventListener("scroll", onScrollChange);
      resizeObserver.unobserve(_element);
    };
  }, [ref]);

  function moveLeft() {
    if (ref.current) scrollToNewCards(ref.current, true);
  }

  function moveRight() {
    if (ref.current) scrollToNewCards(ref.current);
  }

  return { moveLeft, moveRight, forwardsEnabled, backwardsEnabled };
}

/**
 * Calculates the appropriate distance to scroll so that all cards
 * that were previously in view are scrolled out of view, while
 * partially visible items are always scrolled into view.
 *
 * Always scrolls at least one full card.
 */
function scrollToNewCards(element: Element, backwards = false) {
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
