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

// Functional component for mobile menu
const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
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
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t border-black/10 text-black">
      {/* Map through pages and render menu items */}
      {page.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {/* If the menu item has a sub-menu */}
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 bor-bottom flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)} // Toggle showCatMenu state on click
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown
                    size={14}
                    style={{
                      transform: showCatMenu ? "scaleY(-1)" : "scaleY(1)",
                    }}
                    className="transition ease-in-out"
                  />
                </div>

                {/* Render sub-menu if showCatMenu is true */}
                {showCatMenu && (
                  <ul className="bg-black/5 -mx-5 mt-4 -mb-4">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => {
                            setShowCatMenu(false); // Close category menu on click
                            setMobileMenu(false); // Close mobile menu on click
                          }}
                        >
                          <li className="py-4 px-8 border-t border-black/10 flex justify-between">
                            {c.name}
                            {/* Category name */}

                            <span className="opacity-50 text-sm">
                              {`(${c.products.data.length})`}
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

              <li className="py-4 px-5 border border-black/10">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
