const Golfer_Num_Cont_Locked = ({ tier }) => {
  if (!tier) {
    return null;
  }

  return (
    <div className="golfer-tier-verbiage-cont">
      <div className="golfer-num">
        Golfer {tier === 1 ? 1 : tier === 2 ? 3 : 5}
      </div>
      <div className="golfer-num">
        Golfer {tier === 1 ? 2 : tier === 2 ? 4 : 6}
      </div>
    </div>
  );
};

export default Golfer_Num_Cont_Locked;
