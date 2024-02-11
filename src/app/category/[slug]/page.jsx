import ProductListPagination from "@/components/ProductListPagination";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

export const metadata = {
  title: "Nike Shoe Store | Category",
};

const maxResult = 3;

export async function generateStaticParams() {
  const category = await fetchDataFromApi("/api/categories?populate=*");

  return category?.data?.map((c) => ({
    slug: c.attributes.slug,
  }));
}
export async function getCategory(slug) {
  const category = await fetchDataFromApi(
    `/api/categories?filters[slug][$eq]=${slug}`
  );

  return category;
}

export async function getProducts(slug) {
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );
  return products;
}

export default async function Page({ params }) {
  const category = await getCategory(params.slug);
  const products = await getProducts(params.slug);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.data?.[0]?.attributes?.name}
          </div>
        </div>

        {/* products grid start */}
        <ProductListPagination slug={params.slug} products={products} />
        {/* products grid end */}
        {/* <PaginationButton /> */}
      </Wrapper>
    </div>
  );
}
