import { useSelector } from "react-redux";

const Golfer_Name_Cont_Locked = ({ tier }) => {
  let part = useSelector((state) => state.part);

  return (
    <div className="golfer-option-cont">
      <div className="golfer-choice-cont">
        <div>
          {tier === 1 ? part.golfer1 : tier === 2 ? part.golfer3 : part.golfer5}
        </div>
      </div>
      <div className="golfer-choice-cont">
        {tier === 1 ? part.golfer2 : tier === 2 ? part.golfer4 : part.golfer6}
      </div>
    </div>
  );
};

export default Golfer_Name_Cont_Locked;
