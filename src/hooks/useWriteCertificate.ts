import { useContractWrite } from "wagmi";
import contractJson from "../abis/MariageCertificate.json";
import { PartnerDetails } from "@/types";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS } from "@/constants";

export const useWriteCertificate = (
  partnerDetails: PartnerDetails[],
  message: string,
  certificateType: number
) => {
  const names = `${partnerDetails[0].name}&${partnerDetails[1].name}`;
  const imageDetails = [
    partnerDetails[0].bodyType,
    partnerDetails[1].bodyType,
    partnerDetails[0].hairColor,
    partnerDetails[1].hairColor,
    partnerDetails[0].skinColor,
    partnerDetails[1].skinColor,
    partnerDetails[0].clothesColor,
    partnerDetails[1].clothesColor,
  ].join("");

  const { data, isError, isLoading, writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractJson.abi,
    functionName: "createCertificate",
    args: [names, imageDetails, message],
    value: parseEther(String((certificateType ?? 0) * 0.01)),
  });

  return { data, writeAsync, isError, isLoading };
};
