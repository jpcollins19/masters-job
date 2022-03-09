import { useSelector } from "react-redux";
import { GS_GolferInfoPush, order } from "../../../store";

const Golfer_Name_Cont_Unlocked = ({ tier, onChangeHandler }) => {
  let golfers = useSelector((state) => state.golfers);
  const part = useSelector((state) => state.part);

  const firstGolferNum = tier === 1 ? 1 : tier === 2 ? 3 : 5;
  const secondGolferNum = tier === 1 ? 2 : tier === 2 ? 4 : 6;
  const startOdds = tier === 1 ? 1 : tier === 2 ? 26 : 76;
  const endOdds = tier === 1 ? 25 : tier === 2 ? 75 : 10000;

  golfers = order(golfers);

  return (
    <div className="golfer-option-cont">
      <div className="golfer-choice-cont-edit">
        <select
          className="drop-down-options white-text"
          onChange={(ev) =>
            onChangeHandler(ev.target.value, `golfer${firstGolferNum}`)
          }
        >
          {GS_GolferInfoPush(part, golfers, startOdds, endOdds, firstGolferNum)}
        </select>
      </div>
      <div className="golfer-choice-cont-edit">
        <select
          className="drop-down-options white-text"
          onChange={(ev) =>
            onChangeHandler(ev.target.value, `golfer${secondGolferNum}`)
          }
        >
          {GS_GolferInfoPush(
            part,
            golfers,
            startOdds,
            endOdds,
            secondGolferNum
          )}
        </select>
      </div>
    </div>
  );
};

export default Golfer_Name_Cont_Unlocked;
