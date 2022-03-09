import { Link } from "react-router-dom";

const Submit_Button_Cont_Unlocked = ({ pathname }) => {
  if (!pathname) {
    return null;
  }

  return (
    <div
      className={
        pathname === "/my_picks_edit_golfers"
          ? "submit-button-and-cancel-cont"
          : "submit-golfers-button-cont"
      }
    >
      <button className="submit-golfers-button-cont">Submit</button>
      <div
        className={
          pathname === "/my_picks_edit_golfers"
            ? "cancel-button-cont"
            : "cancel-button-cont-tiebreaker"
        }
      >
        <Link
          to="my_picks"
          style={{ textDecoration: "none" }}
          className="white-text bold"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Submit_Button_Cont_Unlocked;
