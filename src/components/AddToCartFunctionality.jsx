"use client";
import { addToCart } from "@/store/cartSlice";
import { fetchDataFromApi } from "@/utils/api";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddToCartFunctionality({ product }) {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const p = product?.data?.[0]?.attributes;

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
          <div className="text-md font-medium  cursor-pointer  bottom-txt-post">
            Select Guide
          </div>
        </div>
        {/* HEADING END */}

        {/* SIZE START */}
        <div id="sizesGrid" className="grid grid-cols-3 gap-2">
          {p.size.data.map((item, i) => (
            <div
              key={i}
              className={`  low-bor rounded-md text-center py-3 font-medium ${
                item.enabled
                  ? "hovbor cursor-pointer"
                  : "cursor-not-allowed hidden-option-bg opacity-50"
              } ${selectedSize === item.size ? "select-bor" : ""}`}
              onClick={() => {
                if (item.enabled) {
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
        className="w-full py-4 rounded-full button-bg text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
        onClick={() => {
          const selectedSizeData = p.size.data.find(
            (item) => item.size === selectedSize
          );

          if (!selectedSizeData || !selectedSizeData.enabled) {
            setShowError(true);
            document.getElementById("sizesGrid").scrollIntoView({
              block: "center",
              behavior: "smooth",
            });
          } else {
            dispatch(
              addToCart({
                ...product?.data?.[0],
                selectedSize,
                oneQuantityPrice: p.price,
              })
            );

            notify();
          }
        }}
      >
        Add to Cart
      </button>
      {/* ADD TO CART BUTTON END */}
    </>
  );
}
