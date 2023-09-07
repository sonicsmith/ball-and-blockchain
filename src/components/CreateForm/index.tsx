"use client";

import { useState } from "react";
import { EditablePartner } from "./EditablePartner";
import { PartnerDetails } from "@/types";
import { Button } from "../Button";
import { useWriteCertificate } from "@/hooks/useWriteCertificate";
import { Loading } from "../Loading";
import { useAccount } from "wagmi";
// @ts-ignore
import { ConnectKitButton } from "connectkit";

const defaultPartnerDetailsLeft: PartnerDetails = {
  name: "",
  bodyType: 0,
  partnerNumber: 0,
  hairColor: "#000000",
  skinColor: "#FFE0AA",
  clothesColor: "#000000",
};

const defaultPartnerDetailsRight: PartnerDetails = {
  name: "",
  bodyType: 1,
  partnerNumber: 1,
  hairColor: "#000000",
  skinColor: "#A0824D",
  clothesColor: "#FEF0E2",
};

export const CreateForm = () => {
  const [partnerLeft, setPartnerLeft] = useState<PartnerDetails>(
    defaultPartnerDetailsLeft
  );
  const [partnerRight, setPartnerRight] = useState<PartnerDetails>(
    defaultPartnerDetailsRight
  );

  const [message, setMessage] = useState<string>("");

  const [certificateType, setCertificateType] = useState<number>(1);

  const onChangeCertificateType = (e: any) => {
    setCertificateType(Number(e.target.value));
  };

  const { data, isLoading, isError, writeAsync } = useWriteCertificate(
    [partnerLeft, partnerRight],
    message,
    certificateType
  );

  const { isConnected } = useAccount();

  const createCertificate = async () => {
    console.log("creating certificate");
    await writeAsync();
    console.log("data", data);
  };

  return (
    <div className="w-full">
      <div className="flex justify-around">
        <EditablePartner
          partnerDetails={partnerLeft}
          setPartnerDetails={setPartnerLeft}
        />
        <EditablePartner
          partnerDetails={partnerRight}
          setPartnerDetails={setPartnerRight}
        />
      </div>
      <div className="mt-6 w-full flex justify-center">
        <textarea
          className="border border-black text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Optional Message"
          rows={3}
          cols={40}
        />
      </div>
      <div className="text-black">
        <div className="m-auto text-center my-3">Certificate type:</div>
        <div className="flex justify-center gap-2">
          {["Bronze", "Silver", "Gold", "Platinum"].map((typeName, index) => {
            return (
              <span key={`${index}`}>
                <input
                  type="radio"
                  id={`${index}`}
                  value={index + 1}
                  checked={certificateType === index + 1}
                  onChange={onChangeCertificateType}
                  className="hover:cursor-pointer"
                />{" "}
                {typeName}
              </span>
            );
          })}
        </div>
        <div className="m-auto text-center my-3">
          Cost: {0.01 * certificateType} ETH
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex justify-center m-4">
            {isConnected ? (
              <Button onClick={createCertificate}>Create</Button>
            ) : (
              <ConnectKitButton.Custom>
                {({ show }: { show: () => void }) => {
                  return <Button onClick={show}>Connect</Button>;
                }}
              </ConnectKitButton.Custom>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
