import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { fetchDataFromApi } from "@/utils/api";

// Navbar pages
const page = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true }, // "Categories" menu item with sub-menu
  { id: 4, name: "Contact", url: "/contact" },
];

// Functional component for desktop menu
const Menu = ({ showCatMenu, setShowCatMenu }) => {
  // State variable for storing categories
  const [categories, setCategories] = useState([]);

  // Fetch categories from API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await fetchDataFromApi("/api/categories?populate=*");
        setCategories(data); // Set fetched categories to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium txt-mode">
      {/* Map through pages and render menu items */}
      {page.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {/* If the menu item has a sub-menu */}
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowCatMenu(true)} // Show sub-menu on mouse enter
                onMouseLeave={() => setShowCatMenu(false)} // Hide sub-menu on mouse leave
              >
                {item.name}
                <BsChevronDown
                  size={14}
                  style={{
                    transform: showCatMenu ? "scaleY(-1)" : "scaleY(1)",
                  }}
                  className="transition ease-in-out"
                />

                {/* Render sub-menu if showCatMenu is true */}
                {showCatMenu && (
                  <ul className="bg-mode absolute top-6 left-0 min-w-[250px] px-1 py-1 txt-mode shadow-lg">
                    {/* Map through categories and render category links */}
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => setShowCatMenu(false)} // Close sub-menu on click
                        >
                          <li className="h-12 flex justify-between items-center px-3 hov rounded-md">
                            {c.name}
                            <span className="opacity-50 text-sm">
                              {`(${c.products.data.length})`}{" "}
                              {/* Number of products in category */}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              // If the menu item does not have a sub-menu
              <li className="cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
