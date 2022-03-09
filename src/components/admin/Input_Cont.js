const Input_Cont = ({
  part,
  val,
  setName,
  setGolfer1,
  setGolfer2,
  setGolfer3,
  setGolfer4,
  setGolfer5,
  setGolfer6,
  setPassword,
  setWinningGolfer,
  setTiebreaker,
  setTourneyStage,
}) => {
  const setFunc = eval(`set${val}`);
  const value = val
    .split("")
    .map((letter, idx) => {
      return idx === 0 ? letter.toLowerCase() : letter;
    })
    .join("");

  return (
    <div className="golfer-choice-cont">
      <input
        className="admin-input white-text"
        defaultValue={part[value]}
        onChange={(ev) => setFunc(ev.target.value)}
      ></input>
    </div>
  );
};

export default Input_Cont;
