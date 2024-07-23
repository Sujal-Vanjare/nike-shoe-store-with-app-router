import Wrapper from "@/components/Wrapper";
import Link from "next/link";

export default function Failed() {
  return (
    <div className="min-h-[650px] flex items-center bg-white text-black">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-black/60 mx-auto flex flex-col">
          <div className="text-2xl font-bold">Payment failed!</div>
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          <div className="underline">shoeshopcontact@shop.com</div>

          <Link href="/" className="font-bold mt-5">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
}
