const Score = ({ rankInfo }) => {
  if (!rankInfo) {
    return null;
  }

  const names = Object.keys(rankInfo);

  return (
    <div id="score-column">
      <h2 className="white-text">Score</h2>
      {names.map((name, idx) => (
        <div key={idx}>
          <input
            className={`${
              rankInfo[name].score < 0 ? "neg-score" : ""
            } small-box center bold`}
            defaultValue={rankInfo[name].score}
          />
        </div>
      ))}
    </div>
  );
};

export default Score;
