"use client";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

// Functional component for rendering individual cart item
const CartItem = ({ data }) => {
  const p = data.attributes; // Destructuring attributes from data prop

  const dispatch = useDispatch(); // Initializing useDispatch hook

  // Function to update cart item quantity or selected size
  const updateCartItem = (e, key) => {
    let payload = {
      key,
      // Determine whether the key is 'quantity'; if so, parse the value as an integer, otherwise, use the value as is original form
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload)); // Dispatching updateCart action with payload
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b bor-bottom">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
          width={120}
          height={120}
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold main-txt-post ">
            {p.name}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium bottom-txt-post block md:hidden">
            {p.subtitle}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold bottom-txt-post mt-2">
            MRP : &#8377;{p.price}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium bottom-txt-post hidden md:block">
          {p.subtitle}
        </div>

        {/* Product size and quantity selection */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 bottom-txt-post text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="iconcolor bg-mode"
                onChange={(e) => updateCartItem(e, "selectedSize")}
                value={data.selectedSize}
              >
                {p.size.data.map((item, i) => {
                  return (
                    <option key={i} value={item.size} disabled={!item.enabled}>
                      {item.size}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Quantity selection */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="iconcolor bg-mode"
                onChange={(e) => updateCartItem(e, "quantity")} // Call updateCartItem function when the selection changes
                value={data.quantity} // Set the current value of the select element to the quantity of the product
              >
                {/* Mapping over an array of length 10 to generate options */}
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Delete icon for removing item from cart */}
          <RiDeleteBin6Line
            onClick={() => dispatch(removeFromCart({ id: data.id }))}
            className="cursor-pointer bottom-txt-post iconcolor  text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
