import { useSelector } from "react-redux";
import Pool_Picks_Single_Cont from "./Pool_Picks_Single_Cont";

const Pool_Picks_Page = () => {
  const joe = useSelector((state) => state.participants).find(
    (participant) => participant.name === "Joe"
  );

  if (!joe) {
    return null;
  }

  return (
    <main id="pool-picks-page">
      <div id="pool-picks-container">
        <div className="pool-picks-all-picks-table-container">
          {joe.tourneyStage !== "pre" ? (
            <Pool_Picks_Single_Cont />
          ) : (
            <div>
              <div className="white-text">
                {" "}
                <h1>Pool Picks not available until Thursday, April 7th</h1>
              </div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Pool_Picks_Page;
