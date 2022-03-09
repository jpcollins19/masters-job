import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Name_Cont = () => {
  const part = useSelector((state) => state.part);
  const { pathname } = useLocation();
  const isLocked =
    pathname === "/my_picks" || pathname === "/name" ? true : false;

  return (
    <div
      className={
        isLocked
          ? "part-name-cont"
          : pathname === "/my_picks_edit_golfers"
          ? "part-name-cont-edit"
          : "part-name-cont-edit-tiebreaker"
      }
    >
      <div className={isLocked ? "part-name" : "part-name-edit"}>
        {part.name}
      </div>
    </div>
  );
};

export default Name_Cont;
