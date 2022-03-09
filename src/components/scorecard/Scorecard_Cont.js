import { useSelector } from "react-redux";
import Rank from "./Rank";
import Name from "./Name";
import Score from "./Score";
import {
  currentScoresObj,
  winningGolferObj,
  winningScoreObj,
  sort,
} from "../../store";

const Scorecard_Cont = () => {
  const participants = useSelector((state) => state.participants).filter(
    (part) => part.tiebreaker
  );
  const golfers = useSelector((state) => state.golfers);

  if (!participants || !golfers) {
    return null;
  }

  const rankInfo = sort(
    currentScoresObj(participants, golfers),
    winningGolferObj(participants, golfers),
    winningScoreObj(participants, golfers),
    "Xander Schauffele",
    -12
  );

  return (
    <div id="scorecard-part-scores-table-container">
      <Rank participants={participants} />
      <Name rankInfo={rankInfo} />
      <Score rankInfo={rankInfo} />
    </div>
  );
};

export default Scorecard_Cont;
