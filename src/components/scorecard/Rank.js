const Rank = ({ participants }) => {
  if (!participants) {
    return null;
  }

  return (
    <div id="rank-column">
      <h2 className="white-text">Rank</h2>
      {participants.map((part, idx) => (
        <div key={idx}>
          <input className="small-box center bold" defaultValue={idx + 1} />
        </div>
      ))}
    </div>
  );
};

export default Rank;
