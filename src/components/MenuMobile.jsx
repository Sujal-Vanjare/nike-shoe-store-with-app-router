import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { fetchDataFromApi } from "@/utils/api";

const page = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

// const subMenuData = [
//   { id: 1, name: "Jordan", doc_count: 11 },
//   { id: 2, name: "Sneakers", doc_count: 8 },
//   { id: 3, name: "Running shoes", doc_count: 64 },
//   { id: 4, name: "Football shoes", doc_count: 107 },
// ];

const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await fetchDataFromApi("/api/categories?populate=*");
        // console.log("Categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };

    fetchCategories();
  }, []);

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-mode bor-top txt-mode">
      {page.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 bor-bottom flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <ul className="subtotal-bg -mx-5 mt-4 -mb-4">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 bor-top flex justify-between">
                            {c.name}

                            <span className="opacity-50 text-sm">
                              {`(${c.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 bor-bottom">
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
