import { PartnerDetails } from "@/types";

interface BodyTypeSelectorProps {
  partnerDetails: PartnerDetails;
  setPartnerDetails: (partnerDetails: PartnerDetails) => void;
}

export const BodyTypeSelector = (props: BodyTypeSelectorProps) => {
  const { partnerDetails, setPartnerDetails } = props;

  const toggleBodyType = () => {
    console.log("toggleBodyType");
    const currentBodyType = partnerDetails.bodyType;
    const bodyType = currentBodyType === 0 ? 1 : 0;
    setPartnerDetails({ ...partnerDetails, bodyType });
  };

  return (
    <div>
      Body Type:{" "}
      <button
        className="border border-black w-8 h-8"
        onClick={toggleBodyType}
      >{`<`}</button>
      <button
        className="border border-black w-8 h-8"
        onClick={toggleBodyType}
      >{`>`}</button>
    </div>
  );
};
