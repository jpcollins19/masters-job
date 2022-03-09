const Name_Cont = ({
  golfer1,
  golfer2,
  golfer3,
  golfer4,
  golfer5,
  golfer6,
}) => {
  if (!golfer1 || !golfer2 || !golfer3 || !golfer4 || !golfer5 || !golfer6) {
    return null;
  }

  return (
    <div className="pool-picks-golfer-name-container">
      <h4>Name</h4>
      <div>{golfer1}</div>
      <div>{golfer2}</div>
      <div>{golfer3}</div>
      <div>{golfer4}</div>
      <div>{golfer5}</div>
      <div>{golfer6}</div>
    </div>
  );
};

export default Name_Cont;
