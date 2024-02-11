"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector } from "react-redux";

// Functional component for header
const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false); // State for mobile menu visibility
  const [showCatMenu, setShowCatMenu] = useState(false); // State for category menu visibility
  const [show, setShow] = useState("translate-y-0"); // State for header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State for last scroll position

  // Redux store state
  const { cartItems } = useSelector((state) => state.cart); // Getting cart items from Redux store

  // Function to control navbar visibility based on scroll position
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      // If scrolled down more than 200 pixels
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]"); // Hide navbar when scrolling down
      } else {
        setShow("shadow-sm"); // Show navbar shadow when scrolling up
      }
    } else {
      setShow("translate-y-0"); // Show navbar when at the top of the page
    }
    setLastScrollY(window.scrollY); // Update last scroll position
  };

  // useEffect hook to add scroll event listener when component mounts and remove it when unmounts
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar); // Add scroll event listener
    return () => {
      window.removeEventListener("scroll", controlNavbar); // Remove scroll event listener on component unmount
    };
  }, [lastScrollY]); //  re-run effect when lastScrollY changes

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-mode flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img src="/logo.svg" className="w-[40px] md:w-[60px] svg" />
        </Link>

        {/* Desktop Menu */}
        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />

        {/* Mobile Menu */}
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}

        {/* Icons */}
        <div className="flex items-center gap-2 txt-mode">
          {/* Favorite Icon */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center icon cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              51
            </div>
          </div>

          {/* Cart Icon */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center icon cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>

          {/* Mobile Menu Icon */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
