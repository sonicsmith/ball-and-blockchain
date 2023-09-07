"use client";

import { useState } from "react";
import { Button } from "../Button";
import Link from "next/link";

export const FindCertificate = () => {
  const [address, setAddress] = useState<string>("");

  return (
    <div className="w-full flex justify-center">
      <input
        type="text"
        placeholder="Enter address"
        className="p-2 w-[420px] text-black"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Link href={`/find?address=${address}`}>
        <Button>Find</Button>
      </Link>
    </div>
  );
};
