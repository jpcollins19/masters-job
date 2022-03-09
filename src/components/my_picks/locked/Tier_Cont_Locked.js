import { useSelector } from "react-redux";
import Tier_Num_Locked from "./Tier_Num_Locked";
import Golfer_Num_Cont_Locked from "./Golfer_Num_Cont_Locked";
import Golfer_Name_Cont_Locked from "./Golfer_Name_Cont_Locked";
import Edit_Button_Cont_Locked from "./Edit_Button_Cont_Locked";

const Tier_Cont_Locked = ({ tier }) => {
  const joe = useSelector((state) => state.participants).find(
    (participant) => participant.name === "Joe"
  );
  const part = useSelector((state) => state.part);

  if (!joe || !part) {
    return null;
  }

  return (
    <div className="part-picks-golfers">
      <div id="golfer-selection-cont">
        {!!part.golfer1 && <Tier_Num_Locked tier={tier} />}
        {!!part.golfer1 && (
          <div className="tier-cont">
            <Golfer_Num_Cont_Locked tier={tier} />
            <Golfer_Name_Cont_Locked tier={tier} />
          </div>
        )}

        {joe.tourneyStage === "pre" && tier === 3 && (
          <Edit_Button_Cont_Locked field={"golfers"} />
        )}
      </div>
    </div>
  );
};

export default Tier_Cont_Locked;
