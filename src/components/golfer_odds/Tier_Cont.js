const Tier_Cont = ({
  golferNamePushTier1,
  golferOddsPushTier1,
  golferNamePushTier2,
  golferOddsPushTier2,
  golferNamePushTier3,
  golferOddsPushTier3,
}) => {
  return (
    <div className="golfer-odds-single-tier-container">
      <div className="golfer-odds-single-tier-text-splitter-container">
        <div className="golfer-odds-single-tier-name-container">
          <ul className="list-style-none golfer-name-text-alignment">
            <h4>Name</h4>
            {golferNamePushTier1}
            {golferNamePushTier2}
            {golferNamePushTier3}
          </ul>
        </div>
        <div className="golfer-odds-single-tier-odds-container">
          <ul
            id="golfer-odds-tier-1-odds-text"
            className="list-style-none golfer-odds-text-alignment"
          >
            <h4>Odds</h4>
            {golferOddsPushTier1}
            {golferOddsPushTier2}
            {golferOddsPushTier3}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tier_Cont;
