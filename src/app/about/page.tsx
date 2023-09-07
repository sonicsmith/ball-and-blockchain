import { Button } from "@/components/Button";
import Link from "next/link";

export default function About() {
  return (
    <main className="">
      <div className="pt-8 w-3/5 text-center text-xl mb-8 m-auto">
        <div className="pb-8">
          Ball and Blockchain is a decentralized application running on the
          Ethereum network. By entering in the details of you and your partner,
          you are able to make a permanent, immutable record of your
          partnership. Once a Ball and Blockchain “marriage certificate“ is
          created, it cannot be destroyed. The certificate cannot be changed by
          the address holder, creators of Ball and Blockchain, or a even a third
          party.
        </div>
        <div className="pb-8">
          This record could be used to mark a real marriage, or as a replacement
          to conventional legal / religious marriage. It could be given as a
          present to a couple, or used as a way to mark a wedding anniversary.
        </div>
        <div className="pb-8">
          The public address attached to the certificate can continue to be used
          as a functional ethereum address. It could even be used as the address
          for wedding donations like a wishing well. To view and create
          certificates with Ball and Blockchain, you will need a web3 compliant
          browser or browser plugin.
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
