import { golferScoreClass, golferFinishingScore } from "../../store";

const Finishing_Score_Cont = ({
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
    <div className="pool-picks-golfer-score-container">
      <h4>Score</h4>
      <div className={golferScoreClass(golfer1, golfers)}>
        {golferFinishingScore(golfer1, golfers)}
      </div>

      <div className={golferScoreClass(golfer2, golfers)}>
        {golferFinishingScore(golfer2, golfers)}
      </div>

      <div className={golferScoreClass(golfer3, golfers)}>
        {golferFinishingScore(golfer3, golfers)}
      </div>

      <div className={golferScoreClass(golfer4, golfers)}>
        {golferFinishingScore(golfer4, golfers)}
      </div>

      <div className={golferScoreClass(golfer5, golfers)}>
        {golferFinishingScore(golfer5, golfers)}
      </div>

      <div className={golferScoreClass(golfer6, golfers)}>
        {golferFinishingScore(golfer6, golfers)}
      </div>
    </div>
  );
};

export default Finishing_Score_Cont;
