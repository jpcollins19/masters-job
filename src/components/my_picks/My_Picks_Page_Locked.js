import { useEffect } from "react";
import { me } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import Name_Cont from "./Name_Cont";
import Tier_Cont_Locked from "./locked/Tier_Cont_Locked";
import Tiebreaker_Cont_Locked from "./locked/Tiebreaker_Cont_Locked";

const My_Picks_Page_Locked = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const part = useSelector((state) => state.part);

  return (
    <main id="my-picks-page" className="white-text">
      <div className="main-cont">
        <div className="pick-cont">
          <div>&nbsp;</div>
          <Name_Cont />
          <div className="part-picks-cont">
            <div className="part-picks-cont1">
              <Tier_Cont_Locked tier={1} />
              <Tier_Cont_Locked tier={2} />
              <Tier_Cont_Locked tier={3} />
            </div>
            {part.golfer1 && <Tiebreaker_Cont_Locked />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default My_Picks_Page_Locked;
