import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Edit_Button_Cont_Locked = ({ field }) => {
  const part = useSelector((state) => state.part);

  return (
    <button
      className={
        field === "tiebreaker"
          ? "edit-tiebreaker-cont"
          : part.golfer1
          ? "edit-golfer-button-cont"
          : "edit-golfer-button-cont-no-picks"
      }
    >
      <Link
        to={
          field === "golfers"
            ? "my_picks_edit_golfers"
            : "my_picks_edit_tiebreaker"
        }
        style={{ textDecoration: "none" }}
      >
        Select / Edit {field === "golfers" ? "Golfers" : "Tiebreaker"}
      </Link>
    </button>
  );
};

export default Edit_Button_Cont_Locked;
