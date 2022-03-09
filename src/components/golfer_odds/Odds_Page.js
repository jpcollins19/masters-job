import { useSelector } from "react-redux";
import { oddsPage_golferInfoPush, order } from "../../store";
import Tier_Cont from "./Tier_Cont";

const Odds_Page = () => {
  let golfers = useSelector((state) => state.golfers);

  golfers = order(golfers);

  return (
    <main id="odds-page" className="white-text">
      <div id="golfer-odds-tier-headers" className="white-text">
        <h2>Tier 1</h2>
        <h2>Tier 2</h2>
        <h2>Tier 3</h2>
      </div>
      <div className="golfer-odds-all-tiers-table-container">
        <Tier_Cont
          golferNamePushTier1={oddsPage_golferInfoPush(golfers, 0, 25, "name")}
          golferOddsPushTier1={oddsPage_golferInfoPush(golfers, 0, 25, "odds")}
        />
        <Tier_Cont
          golferNamePushTier2={oddsPage_golferInfoPush(golfers, 26, 75, "name")}
          golferOddsPushTier2={oddsPage_golferInfoPush(golfers, 26, 75, "odds")}
        />
        <Tier_Cont
          golferNamePushTier3={oddsPage_golferInfoPush(
            golfers,
            76,
            1000,
            "name"
          )}
          golferOddsPushTier3={oddsPage_golferInfoPush(
            golfers,
            76,
            1000,
            "odds"
          )}
        />
      </div>
    </main>
  );
};

export default Odds_Page;
