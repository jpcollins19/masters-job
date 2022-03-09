import { useSelector } from "react-redux";
import Submit_Button_Cont_Unlocked from "./Submit_Button_Cont_Unlocked";
import { tiebreaker_golferInfoPush, order } from "../../../store";

const Tiebreaker_Selections_Unlocked = ({
  part,
  pathname,
  onChangeHandler,
}) => {
  if (!part || !pathname) {
    return null;
  }

  let golfers = useSelector((state) => state.golfers);
  golfers = order(golfers);

  return (
    <div id="tiebreaker-info-cont">
      <div className="tiebreaker-header-edit">
        <h3>Tiebreaker</h3>
      </div>

      <div className="tiebreaker-tier-cont">
        <div className="golfer-tier-verbiage-cont">
          <div className="golfer-num">Winning Golfer</div>
          <div className="tiebreaker-score-verbiage-cont">Winning Score</div>
        </div>

        <div className="golfer-option-cont">
          <div>
            <select
              className="drop-down-options white-text"
              onChange={(ev) =>
                onChangeHandler(ev.target.value, "winningGolfer")
              }
            >
              {tiebreaker_golferInfoPush(part, golfers)}
            </select>
          </div>
          <div>
            <input
              className="drop-down-options center white-text"
              defaultValue={part.tiebreaker}
              onChange={(ev) => onChangeHandler(ev.target.value, "tiebreaker")}
            ></input>
          </div>
        </div>
      </div>
      <Submit_Button_Cont_Unlocked pathname={pathname} />
    </div>
  );
};

export default Tiebreaker_Selections_Unlocked;
