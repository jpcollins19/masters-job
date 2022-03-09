import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Name_Cont from "./Name_Cont";
import Tier_Cont_Unlocked from "./un-locked/Tier_Cont_Unlocked";
import Submit_Button_Cont_Unlocked from "./un-locked/Submit_Button_Cont_Unlocked";
import Tiebreaker_Selections_Unlocked from "./un-locked/Tiebreaker_Selections_Unlocked";
import { updatePart } from "../../store";

const My_Picks_Page_Unlocked = () => {
  const part = useSelector((state) => state.part);
  const [golfer1, setGolfer1] = useState(part.golfer1);
  const [golfer2, setGolfer2] = useState(part.golfer2);
  const [golfer3, setGolfer3] = useState(part.golfer3);
  const [golfer4, setGolfer4] = useState(part.golfer4);
  const [golfer5, setGolfer5] = useState(part.golfer5);
  const [golfer6, setGolfer6] = useState(part.golfer6);
  const [winningGolfer, setWinningGolfer] = useState(part.winningGolfer);
  const [tiebreaker, setTiebreaker] = useState(part.tiebreaker);
  let [error, setError] = useState("");

  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const golfers = [golfer1, golfer2, golfer3, golfer4, golfer5, golfer6];

  const relayError = (error) => {
    switch (error) {
      case "dupe-golfer":
        return "You cannot select the same golfer twice.";
        break;
      case "null-golfer":
        return "Golfer picks are incomplete.";
        break;
      case "null-winning-golfer":
        return "Winning Golfer is not valid.";
        break;
      case "winning-golfer-not-valid":
        return "Winning Golfer is not valid.";
        break;
      case "null-tiebreaker":
        return "Tiebreaker score needs to be an integer.";
        break;
      case "Validation isNumeric on tiebreaker":
        return "Tiebreaker score needs to be an integer.";
        break;
      default:
        return "Error not recognized, contact Joe";
    }
  };

  const onChangeHandler = async (data, field) => {
    switch (field) {
      case "golfer1":
        setGolfer1(data);
        setError("");
        break;
      case "golfer2":
        setGolfer2(data);
        setError("");
        break;
      case "golfer3":
        setGolfer3(data);
        setError("");
        break;
      case "golfer4":
        setGolfer4(data);
        setError("");
        break;
      case "golfer5":
        setGolfer5(data);
        setError("");
        break;
      case "golfer6":
        setGolfer6(data);
        setError("");
        break;
      case "winningGolfer":
        setWinningGolfer(data);
        setError("");
        break;
      case "tiebreaker":
        setTiebreaker(data);
        setError("");
        break;
      default:
        throw "Error in the onChangeHandler";
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const participant = {
        id: part.id,
        email: part.email,
        password: part.password,
        name: part.name,
        golfer1,
        golfer2,
        golfer3,
        golfer4,
        golfer5,
        golfer6,
        tiebreaker,
        winningGolfer,
        paid: part.paid,
        tourneyStage: part.tourneyStage,
      };

      if (
        golfer1 === null ||
        golfer2 === null ||
        golfer3 === null ||
        golfer4 === null ||
        golfer5 === null ||
        golfer6 === null
      ) {
        setError("null-golfer");
      } else if (
        golfer1 === golfer2 ||
        golfer3 === golfer4 ||
        golfer5 === golfer6
      ) {
        setError("dupe-golfer");
      } else if (
        pathname === "/my_picks_edit_tiebreaker" &&
        winningGolfer === null
      ) {
        setError("null-winning-golfer");
      } else if (
        pathname === "/my_picks_edit_tiebreaker" &&
        tiebreaker === null
      ) {
        setError("null-tiebreaker");
      } else if (
        pathname === "/my_picks_edit_tiebreaker" &&
        !Number(tiebreaker)
      ) {
        setError("null-tiebreaker");
      } else if (
        pathname === "/my_picks_edit_tiebreaker" &&
        !golfers.includes(winningGolfer)
      ) {
        setError("winning-golfer-not-valid");
      } else {
        await dispatch(updatePart(participant, history));
        error = "";
      }
    } catch (err) {
      console.log("error in handleSubmit:", err);
      setError();
      // err.response.request.responseText.split(
      //   "SequelizeValidationError: Validation error: "
      // )[1]
      // .split(" failed")[0]
      // .split('"error":"Validation error: Validation ')[1]
    }
  };

  return (
    <main id="my-picks-page" className="white-text">
      <div className="main-cont-edit-golfers">
        <div
          className={
            pathname === "/my_picks_edit_golfers"
              ? "pick-cont-edit-golfers"
              : "pick-cont-edit-tiebreaker"
          }
        >
          <div>&nbsp;</div>
          <Name_Cont />
          <div className="error-cont">
            {error ? (
              <Alert severity="error" className="error-text">
                {relayError(error)}
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="part-picks-cont">
            <form id="form-cont" onSubmit={handleSubmit}>
              {pathname === "/my_picks_edit_golfers" ? (
                <div>
                  <Tier_Cont_Unlocked
                    tier={1}
                    onChangeHandler={onChangeHandler}
                  />
                  <Tier_Cont_Unlocked
                    tier={2}
                    onChangeHandler={onChangeHandler}
                  />
                  <Tier_Cont_Unlocked
                    tier={3}
                    onChangeHandler={onChangeHandler}
                  />
                </div>
              ) : pathname === "/my_picks_edit_tiebreaker" ? (
                <Tiebreaker_Selections_Unlocked
                  part={part}
                  pathname={pathname}
                  onChangeHandler={onChangeHandler}
                />
              ) : (
                ""
              )}

              {pathname === "/my_picks_edit_golfers" && (
                <Submit_Button_Cont_Unlocked pathname={pathname} />
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default My_Picks_Page_Unlocked;
