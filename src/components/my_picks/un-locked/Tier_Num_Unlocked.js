const Tier_Num_Unlocked = ({ tier }) => {
  if (!tier) {
    return null;
  }

  return (
    <div className="tier-header-cont-edit">
      <div className="tier-header">
        <h3>Tier {tier === 1 ? 1 : tier === 2 ? 2 : 3}</h3>
      </div>
    </div>
  );
};

export default Tier_Num_Unlocked;
