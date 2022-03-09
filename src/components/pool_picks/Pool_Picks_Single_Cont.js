import { useSelector } from "react-redux";
import { paidStatus, partTotal } from "../../store";
import Missed_Cut_Cont from "./Missed_Cut_Cont";
import Name_Cont from "./Name_Cont";
import Tier_Cont from "./Tier_Cont";
import Finishing_Score_Cont from "./Finishing_Score_Cont";
import Total_Score_Cont from "./Total_Score_Cont";

const Pool_Picks_Single_Cont = () => {
  const participants = useSelector((state) => state.participants).filter(
    (part) => part.tiebreaker
  );
  const golfers = useSelector((state) => state.golfers);

  const state = useSelector((state) => state);

  if (!participants || !golfers) {
    return null;
  }

  return participants.map((partObj) => (
    <div
      key={partObj.id}
      id={partObj.name}
      className="pool-picks-single-container"
    >
      <div className="white-text">
        <h2 className={paidStatus(partObj.paid)}>
          {partObj.name}: {partTotal(partObj, golfers)}{" "}
          {!partObj.paid && "- has not paid"}
        </h2>
        <h3
          className={`tiebreaker-info ${
            partObj.winningGolfer === partObj.golfer1 ||
            partObj.winningGolfer === partObj.golfer2 ||
            partObj.winningGolfer === partObj.golfer3 ||
            partObj.winningGolfer === partObj.golfer4 ||
            partObj.winningGolfer === partObj.golfer5 ||
            partObj.winningGolfer === partObj.golfer6
              ? ""
              : "not-paid"
          }`}
        >
          Tiebreaker - {partObj.winningGolfer}: {partObj.tiebreaker}
        </h3>
      </div>
      <div className="pool-picks-golfer-info-text-container">
        <Missed_Cut_Cont {...partObj} golfers={golfers} />
        <Name_Cont {...partObj} />
        <Tier_Cont {...partObj} golfers={golfers} />
        <Finishing_Score_Cont {...partObj} golfers={golfers} />
        <Total_Score_Cont {...partObj} golfers={golfers} />
      </div>
    </div>
  ));
};

export default Pool_Picks_Single_Cont;
