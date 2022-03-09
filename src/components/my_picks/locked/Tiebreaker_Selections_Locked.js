const Tiebreaker_Selections_Locked = ({ part }) => {
  if (!part) {
    return null;
  }
  return (
    <div className="golfer-option-cont">
      <div className="golfer-choice-cont">
        <div>{part.winningGolfer}</div>
      </div>
      <div className="golfer-choice-cont">
        <div>{part.tiebreaker}</div>
      </div>
    </div>
  );
};

export default Tiebreaker_Selections_Locked;
