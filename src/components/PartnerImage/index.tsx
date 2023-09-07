import { PartnerDetails } from "@/types";
import { Male } from "./Male";
import { Female } from "./Female";

export const PartnerImage = (props: PartnerDetails) => {
  return (
    <div className="flex justify-center">
      {props.bodyType === 0 ? <Male {...props} /> : <Female {...props} />}
    </div>
  );
};
