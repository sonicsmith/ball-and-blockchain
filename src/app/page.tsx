import { Button } from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="pt-32 w-full text-center font-thin">
        <div className="text-6xl text-white">
          <span>BALL AND</span>
          <span className="font-bold ml-2 text-pinkTheme">BLOCKCHAIN</span>
        </div>
        <div className="text-2xl mt-4">
          Create a permanent, immutable record of your love, on the blockchain.
        </div>
        <div className="flex gap-8 mt-8 w-full justify-center text-white">
          <Link href="/create">
            <Button>Create Now</Button>
          </Link>
          <Link href="/find?address=0xefdd4c11efd4df6f1173150e89102d343ae50aa4">
            <Button>See Example</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
