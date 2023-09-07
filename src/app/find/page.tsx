import { Certificate } from "@/components/Certificate";
import { FindCertificate } from "@/components/FindCertificate";

export default function Find({
  searchParams,
}: {
  searchParams: { address: string };
}) {
  const { address } = searchParams;
  return (
    <main className="">
      <div className="pt-8 w-full text-center text-xl mb-4">
        {!address && "Check if a certificate exists for a given address:"}
      </div>
      <div className="m-auto flex justify-center">
        {address ? <Certificate address={address} /> : <FindCertificate />}
      </div>
    </main>
  );
}
