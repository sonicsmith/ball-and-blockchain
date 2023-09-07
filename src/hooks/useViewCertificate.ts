import { useContractRead } from "wagmi";
import contractJson from "../abis/MariageCertificate.json";
import { useMemo } from "react";
import { formatUnits } from "viem";
import { PartnerDetails } from "@/types";
import { CONTRACT_ADDRESS } from "@/constants";

export const useViewCertificate = (address: string) => {
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractJson.abi,
    functionName: "getCertificate",
    args: [address],
  });

  const price = useMemo(() => {
    if (data) {
      return String(formatUnits((data as any[])[0], 18));
    }
  }, [data]);

  const borderColor = useMemo(() => {
    if (data) {
      switch (price) {
        case "0.01":
          return "#CD7F32";
        case "0.02":
          return "#C0C0C0";
        case "0.03":
          return "#D4AF37";
        default:
          return "#dddddd";
      }
    }
  }, [data, price]);

  const partnerDetails: PartnerDetails[] | undefined = useMemo(() => {
    if (data) {
      const names = (data as string[])[1].split("&");
      const details = (data as string[])[2].split("#");
      const bodyType = details[0];
      return [
        {
          name: names[0],
          bodyType: bodyType[0] === "0" ? 0 : 1,
          hairColor: `#${details[1]}`,
          skinColor: `#${details[3]}`,
          clothesColor: `#${details[5]}`,
          partnerNumber: 0,
        },
        {
          name: names[1],
          bodyType: bodyType[1] === "0" ? 0 : 1,
          hairColor: `#${details[2]}`,
          skinColor: `#${details[4]}`,
          clothesColor: `#${details[6]}`,
          partnerNumber: 1,
        },
      ];
    }
  }, [data]);

  return {
    data: {
      borderColor,
      partnerDetails,
      price,
      message: data ? (data as string[])[3] : "",
      blockNumber: data ? String((data as string[])[4]) : "",
    },
    isError,
    isLoading,
  };
};
