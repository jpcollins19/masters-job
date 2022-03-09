import { golferTier } from "../../store";

const Tier_Cont = ({
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
    <div className="pool-picks-golfer-tier-container">
      <h4>Tier</h4>
      <div>{golferTier(golfer1, golfers)}</div>
      <div>{golferTier(golfer2, golfers)}</div>
      <div>{golferTier(golfer3, golfers)}</div>
      <div>{golferTier(golfer4, golfers)}</div>
      <div>{golferTier(golfer5, golfers)}</div>
      <div>{golferTier(golfer6, golfers)}</div>
    </div>
  );
};

export default Tier_Cont;
