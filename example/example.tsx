import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";
import { QueryInfiniteScroll, type QueryInfiniteScrollProps } from "../src";
const queryClient = new QueryClient();
function Example() {
  const query = useInfiniteQuery(
    ["todo"],
    async ({ pageParam = 1 }) => {
      return await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${pageParam}&size=10`
      ).then((res) => res.json());
    },
    {
      getNextPageParam: (_, allPages) => {
        const nextPage = allPages.length + 1;
        if (nextPage > 5) return undefined;
        return nextPage;
      },
    }
  );

  return (
    <div className="App">
      <QueryInfiniteScroll
        query={query}
        loading={<div>loading</div>}
        error={<div>loading</div>}
        observer={<div>loading</div>}
      >
        {(res) => {
          return res?.data.map((data, idx) => <div key={idx}>{data._id}</div>);
        }}
      </QueryInfiniteScroll>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);
