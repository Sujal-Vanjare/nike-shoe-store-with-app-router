"use client";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr"; // Importing useSWR hook for data fetching with caching support, it shows cache data first then fetch,  revalidate the data and show the changes
import ProductCard from "./ProductCard";

const maxResult = 3; // Maximum number of results to display per page

// Functional component for displaying a paginated list of products
export default function ProductListPagination({ slug, products }) {
  // State variable for current page index
  const [pageIndex, setPageIndex] = useState(1);

  // Accessing router object from useRouter hook
  const { query } = useRouter();

  useEffect(() => {
    setPageIndex(1); // when we are page 2 and change the category, then set page 1
  }, [query]);

  // Fetching data from API using useSWR hook
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi, // Function to fetch data from API
    {
      fallbackData: products, // Fallback data to use while fetching data
    }
  );

  return (
    <>
      {/* products grid start */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
        {data?.data?.map((product) => (
          <ProductCard key={product?.id} data={product} />
        ))}
      </div>
      {/* products grid end */}
      {/* PAGINATION BUTTONS START */}

      {/*  Render pagination buttons only if total number of products is greater than maxResult */}
      {data?.meta?.pagination?.total > maxResult && (
        <div className="flex gap-3 items-center justify-center my-16 md:my-0">
          <button
            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
            disabled={pageIndex === 1} // Disable if already on the first page
            onClick={() => setPageIndex(pageIndex - 1)} // Go to previous page on click
          >
            Previous
          </button>

          {/* 1 of 3 page indicator*/}
          <span className="font-bold">{`${pageIndex} of ${
            data && data.meta.pagination.pageCount
          }`}</span>

          {/* Next page button */}
          <button
            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
            disabled={pageIndex === (data && data.meta.pagination.pageCount)} // Disable if already on the last page
            onClick={() => setPageIndex(pageIndex + 1)} // Go to next page on click
          >
            Next
          </button>
        </div>
      )}
      {/* PAGINATION BUTTONS END */}

      {/* Loading indicator */}
      {isLoading && (
        // Render loading indicator while data is being fetched
        <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
          <img src="/logo.svg" width={150} />
          <span className="text-2xl font-medium">Loading...</span>
        </div>
      )}
    </>
  );
}
