import { missedCutSymbol, missedCutClass } from "../../store";

const MissedCut_Cut_Cont = ({
  golfers,
  golfer1,
  golfer2,
  golfer3,
  golfer4,
  golfer5,
  golfer6,
}) => {
  if (
    !golfers ||
    !golfer1 ||
    !golfer2 ||
    !golfer3 ||
    !golfer4 ||
    !golfer5 ||
    !golfer6
  ) {
    return null;
  }

  return (
    <div className="pool-picks-golfer-cut-container">
      <h4>M</h4>
      <div className={missedCutClass(golfer1, golfers)}>
        {missedCutSymbol(golfer1, golfers)}
      </div>

      <div className={missedCutClass(golfer2, golfers)}>
        {missedCutSymbol(golfer2, golfers)}
      </div>

      <div className={missedCutClass(golfer3, golfers)}>
        {missedCutSymbol(golfer3, golfers)}
      </div>

      <div className={missedCutClass(golfer4, golfers)}>
        {missedCutSymbol(golfer4, golfers)}
      </div>

      <div className={missedCutClass(golfer5, golfers)}>
        {missedCutSymbol(golfer5, golfers)}
      </div>

      <div className={missedCutClass(golfer6, golfers)}>
        {missedCutSymbol(golfer6, golfers)}
      </div>
    </div>
  );
};

export default MissedCut_Cut_Cont;
