export const oddsPage_golferInfoPush = (arr, startOdds, endOdds, param) => {
  return arr
    .filter(
      (obj) =>
        obj.odds.split("-")[0] >= startOdds && obj.odds.split("-")[0] <= endOdds
    )
    .map((obj) => <li key={obj.id}>{obj[param]}</li>);
};

export const order = (arr) => {
  return arr
    .reduce((a, obj) => {
      const newObj = {};
      newObj[obj.id] = Number(obj.odds.split("-")[0]);
      a.push(newObj);
      return a;
    }, [])
    .sort((a, b) => Object.values(a) - Object.values(b))
    .reduce((a, obj) => {
      a.push(
        arr.find((golferObj) => golferObj.id === Number(Object.keys(obj)))
      );
      return a;
    }, []);
};

export const GS_GolferInfoPush = (
  part,
  golferArr,
  startOdds,
  endOdds,
  golferNum
) => {
  const golferNumber = `golfer${golferNum}`;

  const golferSelection = golferArr
    .filter((golfer) => golfer.name === part[golferNumber])
    .map((golfer) => {
      return (
        <option key={golfer.id} value={golfer.name}>
          {golfer.name}: {golfer.odds}
        </option>
      );
    });

  console.log("golferSelection", golferSelection);

  const chooseGolfer = <option key="choose-golfer">Choose Golfer</option>;

  return part.golfer1
    ? [golferSelection, golferArr].map((golferArr, idx) => {
        return idx === 0
          ? golferArr
          : golferArr
              .filter(
                (golfer) =>
                  golfer.odds.split("-")[0] >= startOdds &&
                  golfer.odds.split("-")[0] <= endOdds &&
                  golfer.name !== part[golferNumber]
              )
              .map((golfer) => {
                return (
                  <option key={golfer.id} value={golfer.name}>
                    {golfer.name}: {golfer.odds}
                  </option>
                );
              });
      })
    : [chooseGolfer, golferArr].map((golferArr, idx) => {
        return idx === 0
          ? golferArr
          : golferArr
              .filter(
                (golfer) =>
                  golfer.odds.split("-")[0] >= startOdds &&
                  golfer.odds.split("-")[0] <= endOdds &&
                  golfer.name !== part[golferNumber]
              )
              .map((golfer) => {
                return (
                  <option key={golfer.id} value={golfer.name}>
                    {golfer.name}: {golfer.odds}
                  </option>
                );
              });
      });
};

export const tiebreaker_golferInfoPush = (part, golferArr) => {
  const golfers = [
    part.golfer1,
    part.golfer2,
    part.golfer3,
    part.golfer4,
    part.golfer5,
    part.golfer6,
  ];
  const errorExists = !golfers.includes(part.winningGolfer) ? true : false;

  const golferSelection = golferArr
    .filter((golfer) => golfer.name === part.winningGolfer)
    .map((golfer) => {
      return (
        <option key={golfer.id} value={golfer.name}>
          {golfer.name}: {golfer.odds}
        </option>
      );
    });

  const chooseGolfer = <option key="choose-golfer">Choose Golfer</option>;

  return !errorExists
    ? [golferSelection, golferArr].map((golferArr, idx) => {
        return idx === 0
          ? golferArr
          : golferArr
              .filter(
                (golfer) =>
                  golfer.name === part.golfer1 ||
                  golfer.name === part.golfer2 ||
                  golfer.name === part.golfer3 ||
                  golfer.name === part.golfer4 ||
                  golfer.name === part.golfer5 ||
                  golfer.name === part.golfer6
              )
              .filter((obj) => obj.name !== part.winningGolfer)
              .map((golfer) => {
                return (
                  <option key={golfer.id} value={golfer.name}>
                    {golfer.name}: {golfer.odds}
                  </option>
                );
              });
      })
    : [chooseGolfer, golferArr].map((golferArr, idx) => {
        return idx === 0
          ? golferArr
          : golferArr
              .filter(
                (golfer) =>
                  golfer.name === part.golfer1 ||
                  golfer.name === part.golfer2 ||
                  golfer.name === part.golfer3 ||
                  golfer.name === part.golfer4 ||
                  golfer.name === part.golfer5 ||
                  golfer.name === part.golfer6
              )
              .filter((obj) => obj.name !== part.winningGolfer)
              .map((golfer) => {
                return (
                  <option key={golfer.id} value={golfer.name}>
                    {golfer.name}: {golfer.odds}
                  </option>
                );
              });
      });
};

export const paidStatus = (boolean) => {
  return !boolean ? `not-paid` : "";
};

export const partTotal = (partObj, arr) => {
  const total = [];

  arr
    .filter((golferObj) => {
      if (
        golferObj.name === partObj.golfer1 ||
        golferObj.name === partObj.golfer2 ||
        golferObj.name === partObj.golfer3 ||
        golferObj.name === partObj.golfer4 ||
        golferObj.name === partObj.golfer5 ||
        golferObj.name === partObj.golfer6
      ) {
        return golferObj;
      }
    })
    .map((golferObj) => {
      golferObj.DQ
        ? total.push(golferObj.finalScore + 10)
        : golferObj.missedCut
        ? total.push(golferObj.finalScore + 5)
        : golferObj.finalScore > golferObj.missedCutNumber
        ? total.push(golferObj.missedCutNumber)
        : total.push(golferObj.finalScore);
    });

  return total.reduce((a, b) => a + b);
};

export const missedCutClass = (name, arr) => {
  const golferObj = arr.find((golferObj) => golferObj.name === name);
  const hasCutHappend = golferObj.missedCutNumber ? true : false;

  if (golferObj.DQ) {
    return "";
  }

  if (!hasCutHappend) {
    return "hide-text";
  }

  return golferObj.missedCut
    ? ""
    : golferObj.finalScore > golferObj.missedCutNumber
    ? ""
    : "hide-text";
};

export const missedCutSymbol = (name, arr) => {
  const golferObj = arr.find((golferObj) => golferObj.name === name);
  const hasCutHappend = golferObj.missedCutNumber ? true : false;

  if (golferObj.DQ) {
    return "#";
  }

  if (!hasCutHappend) {
    return "";
  }

  return golferObj.missedCut
    ? "*"
    : golferObj.finalScore > golferObj.missedCutNumber
    ? "@"
    : ".";
};

export const golferTier = (name, arr) => {
  const odds =
    arr.find((golferObj) => golferObj.name === name).odds.split("-")[0] * 1;

  return odds <= 25 ? 1 : odds <= 75 ? 2 : 3;
};

export const golferFinishingScore = (name, arr) => {
  return arr.find((golferObj) => golferObj.name === name).finalScore;
};

export const golferScoreClass = (name, arr) => {
  return golferFinishingScore(name, arr) < 0 ? "neg-score" : "";
};

export const golferTotal = (name, arr) => {
  const golferObj = arr.find((golferObj) => golferObj.name === name);
  const hasCutHappend = golferObj.missedCutNumber ? true : false;

  if (golferObj.DQ) {
    return golferObj.finalScore + 10;
  }

  if (!hasCutHappend) {
    return golferObj.finalScore;
  }

  return golferObj.missedCut
    ? golferObj.finalScore + 5
    : golferObj.finalScore >= golferObj.missedCutNumber
    ? golferObj.missedCutNumber
    : golferObj.finalScore;
};

export const golferTotalClass = (name, arr) => {
  return golferTotal(name, arr) < 0 ? "neg-score" : "";
};

export const currentScoresObj = (partArr, golferArr) => {
  return partArr.reduce((a, partObj) => {
    const total = [];

    golferArr
      .reduce((a, golfer) => {
        if (
          golfer.name === partObj.golfer1 ||
          golfer.name === partObj.golfer2 ||
          golfer.name === partObj.golfer3 ||
          golfer.name === partObj.golfer4 ||
          golfer.name === partObj.golfer5 ||
          golfer.name === partObj.golfer6
        ) {
          a.push(golfer);
        }
        return a;
      }, [])
      .map((golferObj) => {
        golferObj.DQ
          ? total.push(golferObj.finalScore + 10)
          : golferObj.missedCut
          ? total.push(golferObj.finalScore + 5)
          : golferObj.finalScore > golferObj.missedCutNumber
          ? total.push(golferObj.missedCutNumber)
          : total.push(golferObj.finalScore);
      });

    a[partObj.name] = total.reduce((a, b) => a + b);

    return a;
  }, {});
};

export const winningGolferObj = (partArr, golferArr) => {
  return partArr.reduce((a, partObj) => {
    a[partObj.name] = golferArr.filter(
      (golferObj) => partObj.winningGolfer === golferObj.name
    )[0].name;

    return a;
  }, {});
};

export const winningScoreObj = (partArr, golferArr) => {
  return partArr.reduce((a, partObj) => {
    a[partObj.name] = partObj.tiebreaker;
    return a;
  }, {});
};

export const sort = (
  currentScoresObj,
  winningGolferObj,
  winningScoreObj,
  winningGolfer,
  winningScore
) => {
  const partNames = Object.keys(currentScoresObj);
  const partScores = Object.values(currentScoresObj);
  const scoresSorted = Object.values(currentScoresObj).sort((a, b) => a - b);

  let noScoresYet = true;

  partScores.map((score) => {
    if (score !== 0) noScoresYet = false;
  });

  if (noScoresYet) {
    return partNames.reduce((a, name) => {
      a[name] = 0;
      return a;
    }, {});
  }

  //obj that gives participant placement based on score
  const scoreCardRank1 = scoresSorted.reduce((a, num) => {
    for (let i = 0; i < partNames.length; i++) {
      if (num === partScores[i]) {
        const newObj = { score: partScores[i], tie: null };
        a[partNames[i]] = newObj;
      }
    }
    return a;
  }, {});

  let valueAudit = false;
  const dupScores = []; //arr that holds all dup scores

  const partNames_ = Object.keys(scoreCardRank1);
  //audits to see if anyone has the same score
  partNames_.reduce((a, name) => {
    const partInfo = scoreCardRank1[name];

    if (a.includes(partInfo.score)) {
      valueAudit = true;
      dupScores.push(partInfo.score);
    } else {
      a.push(partInfo.score);
    }
    return a;
  }, []);

  if (valueAudit && winningScore) {
    //arr that includes the names of people to audit
    const namesToAudit = Object.keys(scoreCardRank1).reduce((a, name) => {
      const partInfo = scoreCardRank1[name];

      if (dupScores.includes(partInfo.score)) {
        a.push(name);
      }
      return a;
    }, []);

    //arr that has the new ranking order of names
    return Object.keys(scoreCardRank1)
      .reduce((a, name) => {
        if (a.length > 0 && namesToAudit.includes(name)) {
          const previousName = a.pop();

          if (
            scoreCardRank1[previousName].score === scoreCardRank1[name].score
          ) {
            const part1WinningGolfer = winningGolferObj[name];
            const part2WinningGolfer = winningGolferObj[previousName];

            const part1WinningScore = Number(winningScoreObj[name]);
            const part2WinningScore = Number(winningScoreObj[previousName]);

            if (
              part1WinningGolfer === part2WinningGolfer &&
              part1WinningScore === part2WinningScore
            ) {
              scoreCardRank1[previousName].tie = true;
              scoreCardRank1[name].tie = true;
              a.push(previousName);
              a.push(name);
            }

            if (
              part1WinningGolfer !== part2WinningGolfer &&
              part1WinningGolfer === winningGolfer
            ) {
              //1
              a.push(name);
              a.push(previousName);
            } else if (
              part1WinningGolfer !== part2WinningGolfer &&
              part2WinningGolfer === winningGolfer
            ) {
              //2
              a.push(previousName);
              a.push(name);
            } else {
              if (
                part1WinningScore === winningScore &&
                part2WinningScore !== winningScore
              ) {
                a.push(name);
                a.push(previousName);
              } else if (
                part2WinningScore === winningScore &&
                part1WinningScore !== winningScore
              ) {
                a.push(previousName);
                a.push(name);
              } else if (
                part1WinningScore > winningScore &&
                part2WinningScore < winningScore
              ) {
                //5 & 9
                a.push(name);
                a.push(previousName);
              } else if (
                part2WinningScore > winningScore &&
                part1WinningScore < winningScore
              ) {
                //6 & 10
                a.push(previousName);
                a.push(name);
              } else {
                if (
                  part1WinningScore < winningScore &&
                  part2WinningScore < winningScore
                ) {
                  if (part1WinningScore > part2WinningScore) {
                    //11
                    a.push(name);
                    a.push(previousName);
                  } else if (part2WinningScore > part1WinningScore) {
                    //12
                    a.push(previousName);
                    a.push(name);
                  }
                } else if (
                  part1WinningScore > winningScore &&
                  part2WinningScore > winningScore
                ) {
                  if (part1WinningScore < part2WinningScore) {
                    //13
                    a.push(name);
                    a.push(previousName);
                  } else if (part2WinningScore < part1WinningScore) {
                    //14
                    a.push(previousName);
                    a.push(name);
                  } else if (part2WinningScore === part1WinningScore) {
                    scoreCardRank1[previousName].tie = true;
                    scoreCardRank1[name].tie = true;
                    a.push(previousName);
                    a.push(name);
                  }
                }
              }
            }
          } else {
            a.push(previousName);
            a.push(name);
          }
        } else {
          a.push(name);
        }

        return a;
      }, [])
      .reduce((a, name) => {
        a[name] = scoreCardRank1[name];
        return a;
      }, {});
  } else {
    return scoreCardRank1;
  }
};
