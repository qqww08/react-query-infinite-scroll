# React-query-Infinite-Scroll

## Installation
```bash
yarn add react-query-infinite-scroll

npm i react-query-infinite-scroll

pnpm i react-query-infinite-scroll
```

## Usage
```tsx
   // v4
     import { useInfiniteQuery } from "@tanstack/react-query";
     const query = useInfiniteQuery(
         ["list"],
          async ({ pageParam = 1 }) => await fetchList()  ...
       );

     // v3
     import { useInfiniteQuery } from "react-query";
     const query = useInfiniteQuery(
         "list",
          async ({ pageParam = 1 }) => await fetchList()  ...
       );

      import { QueryInfiniteScroll } from "react-query-infinite-scroll";
      <QueryInfiniteScroll
        query={query}
        loading={<div>loading</div>}
        onScreen={<div>loading</div>}
      >
        {(res) => {
          return res?.data.map((data, idx) => <div key={idx}>{data._id}</div>);
        }}
      </QueryInfiniteScroll>
```

## Props
```tsx
export interface QueryInfiniteScrollProps<TValue, TError> {
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
```
