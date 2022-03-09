const Name = ({ rankInfo }) => {
  if (!rankInfo) {
    return null;
  }

  const names = Object.keys(rankInfo);

  return (
    <div id="part-name-column">
      <h2 className="white-text">Name</h2>
      {names.map((name, idx) => (
        <div key={idx}>
          <input
            className={`name-box center bold ${
              rankInfo[name].tie && "tie-tie"
            }`}
            defaultValue={name}
          />
        </div>
      ))}
    </div>
  );
};

export default Name;
