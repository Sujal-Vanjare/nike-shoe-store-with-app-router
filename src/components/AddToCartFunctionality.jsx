"use client";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddToCartFunctionality({ product }) {
  const [selectedSize, setSelectedSize] = useState(); // State for selectedSize
  const [showError, setShowError] = useState(false); // State to control error message visibility
  const dispatch = useDispatch(); // Redux dispatch function
  const p = product?.data?.[0]?.attributes; // Extracting product attributes from props

  // Notification function
  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      {/* PRODUCT SIZE RANGE START */}
      <div className="mb-10">
        {/* HEADING START */}
        <div className="flex justify-between mb-2">
          <div className="text-md font-semibold">Select Size</div>
          <div className="text-md font-medium  cursor-pointer text-black/80">
            Select Guide
          </div>
        </div>
        {/* HEADING END */}

        {/* SIZE START */}
        <div id="sizesGrid" className="grid grid-cols-3 gap-2">
          {p.size.map((item, i) => (
            <div
              key={i} // Unique key for each size item
              // Conditional class based on item's enabled status
              className={`border border-black/10 rounded-md text-center py-3 font-medium ${
                item.enabled
                  ? "border-black cursor-pointer"
                  : "cursor-not-allowed bg-black/10 opacity-50"
              } ${
                selectedSize === item.size ? "!border !border-black/60" : ""
              }`}
              onClick={() => {
                // Handle click event for size selection
                if (item.enabled) {
                  // If size is enabled, set it as selected and hide error message
                  setSelectedSize(item.size);
                  setShowError(false);
                }
              }}
            >
              {item.size}
            </div>
          ))}
        </div>
        {/* SIZE END */}

        {/* SHOW ERROR START */}
        {showError && (
          <div className="text-red-600 mt-1">Size selection is required</div>
        )}
        {/* SHOW ERROR END */}
      </div>
      {/* PRODUCT SIZE RANGE END */}

      {/* ADD TO CART BUTTON START */}
      <button
        className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
        onClick={() => {
          // Find the selected size data
          const selectedSizeData = p.size.find(
            (item) => item.size === selectedSize
          );

          // Check if selected size is valid and enabled
          if (!selectedSizeData || !selectedSizeData.enabled) {
            setShowError(true); // Show error message
            document.getElementById("sizesGrid").scrollIntoView({
              block: "center",
              behavior: "smooth",
            }); // Scroll to the size options grid
          } else {
            // Dispatch addToCart action with product details
            dispatch(
              addToCart({
                ...product?.data?.[0],
                selectedSize,
                oneQuantityPrice: p.price,
              })
            );

            notify(); // Show success notification
          }
        }}
      >
        Add to Cart
      </button>
      {/* ADD TO CART BUTTON END */}
    </>
  );
}
