import { useSelector } from "react-redux";
import Scorecard_Cont from "./Scorecard_Cont";

const Scorecard_Page = () => {
  const joe = useSelector((state) => state.participants).find(
    (participant) => participant.name === "Joe"
  );

  const part = useSelector((state) => state.part);

  if (!joe) {
    return null;
  }

  return (
    <main id="scorecard_page">
      <div id="scorecard-master-container">
        <div id="scorecard-part-scores-container">
          {joe.tourneyStage !== "pre" ? (
            <Scorecard_Cont />
          ) : (
            <div>
              <div className="white-text">
                <h1>Scorecard not available until Thursday, April 7th</h1>
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
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Scorecard_Page;
