"use client";

import { useViewCertificate } from "@/hooks/useViewCertificate";
import { PartnerImage } from "../PartnerImage";
import { Loading } from "../Loading";

interface CertificateProps {
  address: string;
}

export const Certificate = ({ address }: CertificateProps) => {
  const { data, isError, isLoading } = useViewCertificate(address);

  if (isLoading) {
    return (
      <div className="p-32">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>ERROR</div>;
  }

  if (!data) {
    return <div>NO DATA</div>;
  }

  const { borderColor, partnerDetails, price, message, blockNumber } = data;

  if (!borderColor) {
    return (
      <div className="text-xl text-center p-6 text-white">
        An imprint was found at this address but was not created with this site
      </div>
    );
  }

  return (
    <div style={{ borderColor, borderWidth: 10 }}>
      <div className="bg-[#e6e6e6] text-black text-center p-6">
        <div className="text-xl">Certificate Address: </div>
        <div className="text-lg">{address}</div>
        <div className="flex justify-center">
          {partnerDetails?.[0] && <PartnerImage {...partnerDetails[0]} />}
          {partnerDetails?.[1] && <PartnerImage {...partnerDetails[1]} />}
        </div>
        <div className="mt-2 text-xl">
          {partnerDetails?.[0]?.name}
          {" & "}
          {partnerDetails?.[1]?.name}
        </div>
        <div className="m-2">
          <div>Were forever inscribed on block {blockNumber}</div>
          <div>of the Ethereum blockchain with the value of {price} ETH.</div>
        </div>
        <div className="bg-white w-[420px] m-auto p-2">{message}</div>
      </div>
    </div>
  );

  // return <div className={"border-4" + borderColor} >
  // <h3>Certificate Address: {this.props.address}</h3>
  // <div>
  //   <PartnerImage partnerDetails={{
  //     partnerNumber: 0,
  //     partnerName,
  //     partnerBodyType,
  //     partnerHairColor,
  //     partnerSkinColor,
  //     partnerClothesColor,
  //   }} />
  //   <PartnerImage partnerDetails={{
  //     partnerNumber: 1,
  //     partnerName,
  //     partnerBodyType,
  //     partnerHairColor,
  //     partnerSkinColor,
  //     partnerClothesColor,
  //   }} />
  // </div>
  // <h1>
  //   {partnerName[0]} {"&"} {partnerName[1]}
  // </h1>
  // <div>
  //   <div>were at {timestamp}, Unix epoch time, forever inscribed on block {blockNumber}</div>
  //   <div>of the Ethereum blockchain with the value of {bid} ETH.</div>
  // </div>
  // <div className="viewableMessage">{message}</div>
  // </div>
  // </div>
};
