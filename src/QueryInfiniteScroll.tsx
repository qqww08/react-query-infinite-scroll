import React, { type ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { type UseInfiniteQueryResult } from "@tanstack/react-query";

export interface QueryInfiniteScrollProps<TValue, TError> {
  children: (item: TValue) => ReactNode;
  /**
   *  useInfiniteQuery result data
   * */
  query: UseInfiniteQueryResult<TValue, TError>;
  /**
   * When react-query status error occurs in fetch data,
   * the screen being rendered is replaced with an error page.
   * */
  error?: ReactNode | ((error: TError) => ReactNode);
  /**
   * If react-query status is in the loading state,
   * the screen is replaced.
   * */
  loading?: ReactNode;
  /**
   * Replace the component that will go into the screen below
   * */
  observer?: ReactNode;
}
/**@description QueryInfiniteScroll
 * @example
 * ```tsx
 *      // v4
 *      import { useInfiniteQuery } from "@tanstack/react-query";
 *      const query = useInfiniteQuery(
 *          ["list"],
 *           async ({ pageParam = 1 }) => await fetchList()  ... ,
 *          { getNextPageParam }
 *        );
 *
 *      // v3
 *      import { useInfiniteQuery } from "react-query";
 *      const query = useInfiniteQuery(
 *          "list",
 *           async ({ pageParam = 1 }) => await fetchList()  ... ,
 *           { getNextPageParam }
 *        );
 *
 *       import { QueryInfiniteScroll } from "react-query-infinite-scroll";
 *
 *       <QueryInfiniteScroll
 *         query={query}
 *         loading={<div>loading</div>}
 *         error={<div>error</div> || (error)=> <div>{error}</div>}
 *         observer={<div>loading</div>}
 *       >
 *         {(res) => {
 *           return res?.data.map((data, idx) => <div key={idx}>{data._id}</div>);
 *         }}
 *       </QueryInfiniteScroll>
 *       ```
 * */
export const QueryInfiniteScroll = <TValue, TError>({
  query: {
    data,
    error,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetched,
  },
  error: errorBoundary,
  loading,
  children,
  observer,
}: QueryInfiniteScrollProps<TValue, TError>) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && isFetched) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, isFetched]);

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
      {hasNextPage && <div ref={ref}>{observer}</div>}
    </>
  );
};
