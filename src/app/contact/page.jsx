import Wrapper from "@/components/Wrapper";
import Link from "next/link";

export default function Page() {
  return (
    <Wrapper>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Contact Nike Shoe Store</h1>

        <p className="opacity-60 mb-4">
          We're always here to help! Feel free to reach out to us with any
          questions, concerns, or feedback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Visit Us</h2>
            <p className="opacity-60">
              123 Sneaker Street <br />
              Cityville, State 12345 <br />
              United States
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Email Us</h2>
            <p className="">
              <a
                href="mailto:info@nikeshoestore.com"
                className="text-blue-500 hover:underline"
              >
                info@nikeshoestore.com
              </a>
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="opacity-60 mb-4">
            Stay updated with the latest releases and exclusive offers by
            subscribing to our newsletter.
          </p>
          <Link
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
