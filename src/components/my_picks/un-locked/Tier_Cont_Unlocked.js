import Tier_Num_Unlocked from "./Tier_Num_Unlocked";
import Golfer_Num_Cont_Unlocked from "./Golfer_Num_Cont_Unlocked";
import Golfer_Name_Cont_Unlocked from "./Golfer_Name_Cont_Unlocked";

const Tier_Cont_Unlocked = ({ tier, onChangeHandler }) => {
  return (
    <div id="golfer-selection-cont">
      <Tier_Num_Unlocked tier={tier} />
      <div className="tier-cont">
        <Golfer_Num_Cont_Unlocked tier={tier} />
        <Golfer_Name_Cont_Unlocked
          tier={tier}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default Tier_Cont_Unlocked;
