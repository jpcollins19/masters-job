import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Edit_Button_Cont_Locked from "./Edit_Button_Cont_Locked";

const Tiebreaker_Cont_Locked = () => {
  const part = useSelector((state) => state.part);
  const joe = useSelector((state) => state.participants).find(
    (participant) => participant.name === "Joe"
  );

  const golfers = [
    part.golfer1,
    part.golfer2,
    part.golfer3,
    part.golfer4,
    part.golfer5,
    part.golfer6,
  ];

  const errorExists = !golfers.includes(part.winningGolfer) ? true : false;

  return (
    <div id="tiebreaker-info-cont">
      <div className="error-cont">
        {errorExists && part.tiebreaker ? (
          <Alert severity="error" className="error-text">
            Winning Golfer is not valid
          </Alert>
        ) : (
          ""
        )}
      </div>
      <div className="tiebreaker-header">
        <h3>Tiebreaker</h3>
      </div>

      {part.tiebreaker && (
        <div className="tiebreaker-tier-cont">
          <div className="golfer-tier-verbiage-cont">
            <div className="golfer-num">Winning Golfer</div>
            <div className="tiebreaker-score-verbiage-cont">Winning Score</div>
          </div>

          <div className="tiebreaker-option-cont">
            <div className="tiebreaker-choice-cont">
              <div>{part.winningGolfer}</div>
            </div>
            <div className="golfer-choice-cont">
              <div>{part.tiebreaker}</div>
            </div>
          </div>
        </div>
      )}

      {joe.tourneyStage == "pre" && (
        <Edit_Button_Cont_Locked field={"tiebreaker"} />
      )}
    </div>
  );
};

export default Tiebreaker_Cont_Locked;
