import { type Ref, useEffect, useState } from "react";

export const useIntersection = <T extends HTMLElement>(): [boolean, Ref<T>] => {
  const [intersecting, setIntersecting] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement>();
  useEffect(() => {
    if (!element) return null;
    const observer = new IntersectionObserver((entries) => {
      setIntersecting(entries[0]?.isIntersecting);
    });
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [element]);
  return [intersecting, (el) => el && setElement(el)];
};
