import AddToCartFunctionality from "@/components/AddToCartFunctionality";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import siteMetadata from "@/utils/siteMetaData";
import { IoMdHeartEmpty } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { ToastContainer } from "react-toastify";

export async function generateStaticParams() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  return products?.data?.map((product) => ({
    slug: product.attributes.slug,
  }));
}

export async function getProduct(slug) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$eq]=${slug}`
  );

  return product;
}

export async function getProducts(slug) {
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return products;
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  const p = product?.data?.[0]?.attributes;
  if (!p) {
    return;
  }

  return {
    metadataBase: siteMetadata.siteUrl,
    title: `${p?.name} | ${siteMetadata.title}`,
    description: `${p?.subtitle} ${p?.name} priced at MRP : ₹ ${p?.price}`,
    openGraph: {
      title: `${p?.name} | ${siteMetadata.title}`,
      description: `${p?.subtitle} ${p?.name} priced at MRP : ₹ ${p?.price}`,
      url: siteMetadata.siteUrl + "/product/" + params?.slug,
      siteName: siteMetadata.title,

      locale: "en_US",
      type: "article",
      publishedTime: p?.publishedAt,
      modifiedTime: p?.updatedAt,
      images: [
        {
          url: p?.images?.thumbnail, // Must be an absolute URL
          width: 592,
          height: 592,
          alt: "thumbnail",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p?.name} | ${siteMetadata.title}`,
      description: `${p?.subtitle} ${p?.name} priced at MRP : ₹ ${p?.price}`,
      images: [
        {
          url: p?.images?.thumbnail, // Must be an absolute URL
          width: 592,
          height: 592,
          alt: "thumbnail",
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const product = await getProduct(params.slug);
  const products = await getProducts(params.slug);

  const p = product?.data?.[0]?.attributes;

  const markdownDescription = p.description
    .map((paragraph) => {
      const text = paragraph.children.map((child) => child.text).join("");
      return `${text}\n\n`; // Add newlines between paragraphs
    })
    .join("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: p?.name,
    description: `${p?.subtitle} ${p?.name} priced at MRP : ₹ ${p?.price}`,
    image: [p?.thumbnail?.data?.attributes?.url],
    datePublished: p?.publishedAt,
    dateModified: p?.updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full md:py-20">
        <ToastContainer />
        <Wrapper>
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            {/* left column start */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel images={p.images.slide_images} />
            </div>
            {/* left column end */}

            {/* right column start */}
            <div className="flex-[1] py-3">
              {/* PRODUCT TITLE */}
              <div className="text-[34px] font-semibold mb-2 leading-tight">
                {p.name}
              </div>

              {/* PRODUCT SUBTITLE */}
              <div className="text-lg font-semibold mb-5">{p.subtitle}</div>

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">
                  MRP : &#8377;{p.price}
                </p>
                {p.original_price && (
                  <>
                    <p className="text-base  font-medium line-through">
                      &#8377;{p.original_price}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(p.original_price, p.price)}%
                      off
                    </p>
                  </>
                )}
              </div>

              <div className="text-md font-medium bottom-txt-post ">
                incl. of taxes
              </div>
              <div className="text-md font-medium bottom-txt-post  mb-20">
                {`(Also includes all applicable duties)`}
              </div>

              <AddToCartFunctionality product={product} />

              {/* WHISHLIST BUTTON START */}
              <button className="w-full py-4 rounded-full bor text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Whishlist
                <IoMdHeartEmpty size={20} />
              </button>
              {/* WHISHLIST BUTTON END */}

              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown>{markdownDescription}</ReactMarkdown>
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>
          <RelatedProducts products={products} />
        </Wrapper>
      </div>
    </>
  );
}
