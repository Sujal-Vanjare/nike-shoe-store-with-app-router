import Wrapper from "@/components/Wrapper";
import Link from "next/link";

export const metadata = {
  title: "Nike Shoe Store | About",
  description:
    "Discover the story behind Nike at our About page. Learn about our brand's mission, values, and commitment to excellence in footwear.",
};

export default function Page() {
  return (
    <Wrapper>
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">About Nike Shoe Store</h1>

        <p className="opacity-70 mb-4">
          Welcome to the Nike Shoe Store, a Next.js project created by [Your
          Name]. Our goal is to provide a seamless and enjoyable shopping
          experience for all the sneaker enthusiasts out there.
        </p>

        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>

        <p className=" opacity-70 mb-4">
          At Nike Shoe Store, we are passionate about delivering the latest and
          greatest Nike footwear to our customers. Whether you're a seasoned
          sneakerhead or just looking for a comfortable pair of shoes, we've got
          you covered.
        </p>

        <h2 className="text-2xl font-bold mb-2">Features</h2>

        <ul
          className="list-disc pl-5 opacity-70
       mb-4"
        >
          <li>Extensive collection of Nike shoes for men, women, and kids.</li>
          <li>Simple and intuitive user interface for easy navigation.</li>
          <li>Secure checkout process for a worry-free shopping experience.</li>
          <li>Responsive design for a seamless experience across devices.</li>
          {/* Add more features as needed */}
        </ul>

        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>

        <div className=" mb-4">
          <p className="opacity-70">
            We'd love to hear from you! If you have any questions, suggestions,
            or just want to chat about sneakers, feel free to{" "}
          </p>
          <Link
            className="text-blue-500 hover:underline
          
          "
            href="/contact"
          >
            contact us
          </Link>
          .
        </div>
      </div>
    </Wrapper>
  );
}
