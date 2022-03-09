import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { updatePart } from "../../store";

const Edit_Name_Page = () => {
  const dispatch = useDispatch();
  const part = useSelector((state) => state.part);
  let [name, setName] = useState(part.name);
  let [error, setError] = useState("");

  const history = useHistory();

  const userNames = useSelector((state) => state.participants).map((user) => {
    return user.name.toLowerCase();
  });

  const relayError = (error) => {
    switch (error) {
      case "name in use":
        return "Name already exists";
        break;
      default:
        return "Error not recognized, contact Joe";
    }
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    try {
      if (userNames.includes(name.toLowerCase())) {
        setError("name in use");
      } else {
        dispatch(
          updatePart(
            {
              id: part.id,
              name,
              email: part.email,
              password: part.password,
              golfer1: part.golfer1,
              golfer2: part.golfer2,
              golfer3: part.golfer3,
              golfer4: part.golfer4,
              golfer5: part.golfer5,
              golfer6: part.golfer6,
              tiebreaker: part.tiebreaker,
              winningGolfer: part.winningGolfer,
              paid: part.paid,
              tourneyStage: part.tourneyStage,
            },
            history
          )
        );
      }
    } catch (err) {
      console.log("error in onSubmit:", err);
    }
  };

  return (
    <main id="my-picks-page" className="white-text">
      <div className="main-cont-edit-golfers">
        <form className="pick-cont-edit-name" onSubmit={onSubmit}>
          <div className="error-cont-name">
            {error ? (
              <Alert severity="error" className="error-text">
                {relayError(error)}
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="part-name-cont-edit-tiebreaker">
            <input
              className="part-name-edit-name"
              defaultValue={part.name}
              name="name"
              onChange={(ev) => setName(ev.target.value)}
            ></input>
          </div>
          <div className="submit-golfers-button-cont">
            <button className="submit-golfers-button-cont">Submit</button>
            <div className="cancel-button-cont-name">
              <Link
                to="name"
                style={{ textDecoration: "none" }}
                className="white-text bold"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Edit_Name_Page;
