import React, { PropsWithChildren, ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { type UseInfiniteQueryResult } from "@tanstack/react-query";

export interface QueryInfiniteScrollProps<TValue, TError> {
  query: UseInfiniteQueryResult<TValue, TError>;
  error?: ReactNode | ((error: TError) => ReactNode);
  loading?: ReactNode;
  onScreen?: ReactNode;
}

export const QueryInfiniteScroll = <TValue, TError>({
  query: {
    data,
    error,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  },
  error: errorBoundary,
  loading,
  children,
  onScreen,
}: PropsWithChildren<QueryInfiniteScrollProps<TValue, TError>>) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage]);

  if (status === "loading") {
    return loading;
  }
  if (status === "error") {
    return typeof errorBoundary === "function"
      ? errorBoundary(error)
      : errorBoundary;
  }
  return (
    <>
      {typeof children === "function"
        ? data?.pages?.map((item) => children(item))
        : children}
      {hasNextPage && <div ref={ref}>{onScreen}</div>}
    </>
  );
};
