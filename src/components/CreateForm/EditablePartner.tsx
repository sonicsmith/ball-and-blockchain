import { PartnerDetails } from "@/types";
import { PartnerImage } from "../PartnerImage";
import { BodyTypeSelector } from "./BodyTypeSelector";

interface EditablePartnerProps {
  partnerDetails: PartnerDetails;
  setPartnerDetails: (partnerDetails: PartnerDetails) => void;
}

export const EditablePartner = (props: EditablePartnerProps) => {
  const { partnerDetails, setPartnerDetails } = props;

  const { name } = partnerDetails;

  return (
    <div className="text-black text-center">
      <div className="m-auto my-2">Partner Name:</div>
      <input
        className="border border-black"
        type="text"
        value={name}
        onChange={(e) =>
          setPartnerDetails({ ...partnerDetails, name: e.target.value })
        }
      />
      <div className="">
        <PartnerImage {...partnerDetails} />
      </div>
      <div className="mt-3">
        <BodyTypeSelector
          partnerDetails={partnerDetails}
          setPartnerDetails={setPartnerDetails}
        />
      </div>
      <div className="m-2">
        Hair color:{" "}
        <input
          type="color"
          value={partnerDetails.hairColor}
          className="hover:cursor-pointer border border-black px-1"
          onChange={(e) =>
            setPartnerDetails({ ...partnerDetails, hairColor: e.target.value })
          }
        />
      </div>
      <div className="m-2">
        Skin color:{" "}
        <input
          type="color"
          value={partnerDetails.skinColor}
          className="hover:cursor-pointer border border-black px-1"
          onChange={(e) =>
            setPartnerDetails({ ...partnerDetails, skinColor: e.target.value })
          }
        />
      </div>
      <div className="m-2">
        Clothes color:{" "}
        <input
          type="color"
          value={partnerDetails.clothesColor}
          className="hover:cursor-pointer border border-black px-1"
          onChange={(e) =>
            setPartnerDetails({
              ...partnerDetails,
              clothesColor: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};
