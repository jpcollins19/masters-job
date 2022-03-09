import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updatePart } from "../../store";
import Input_Cont from "./Input_Cont";

const Admin_Page = () => {
  const dispatch = useDispatch();
  const parts = useSelector((state) => state.participants);
  const [partObj, setPartObj] = useState({});
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [paid, setPaid] = useState(false);
  const [golfer1, setGolfer1] = useState("");
  const [golfer2, setGolfer2] = useState("");
  const [golfer3, setGolfer3] = useState("");
  const [golfer4, setGolfer4] = useState("");
  const [golfer5, setGolfer5] = useState("");
  const [golfer6, setGolfer6] = useState("");
  const [winningGolfer, setWinningGolfer] = useState("");
  const [tiebreaker, setTiebreaker] = useState(0);
  const [tourneyStage, setTourneyStage] = useState("");

  const history = useHistory();

  useEffect(() => {
    setName(partObj.name);
    setPassword(partObj.password);
    setPaid(partObj.paid);
    setGolfer1(partObj.golfer1);
    setGolfer2(partObj.golfer2);
    setGolfer3(partObj.golfer3);
    setGolfer4(partObj.golfer4);
    setGolfer5(partObj.golfer5);
    setGolfer6(partObj.golfer6);
    setWinningGolfer(partObj.winningGolfer);
    setTiebreaker(partObj.tiebreaker);
    setTourneyStage(partObj.tourneyStage);
  }, [partObj]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const participant = {
        id: partObj.id,
        email: partObj.email,
        password,
        name,
        golfer1,
        golfer2,
        golfer3,
        golfer4,
        golfer5,
        golfer6,
        tiebreaker: Number(tiebreaker),
        winningGolfer,
        paid,
        tourneyStage,
      };
      console.log(participant);

      dispatch(updatePart(participant, history));
    } catch (err) {
      console.log(err);
    }
  };

  const togglePaid = () => setPaid((value) => !value);

  return (
    <main id="my-picks-page" className="white-text">
      <div className="main-cont">
        <div className="pick-cont">
          <div>&nbsp;</div>
          <select
            className="drop-down-options-admin white-text"
            onChange={(ev) => {
              setPartObj(parts.find((part) => part.id === ev.target.value));
            }}
          >
            <option>Choose Part</option>
            {parts.map((part) => (
              <option key={part.name} value={part.id}>
                {part.email}
              </option>
            ))}
          </select>

          <form className="part-picks-cont-admin" onSubmit={handleSubmit}>
            <div className="part-picks-cont1">
              <div className="part-picks-golfers">
                <div id="golfer-selection-cont">
                  <div className="tier-cont-admin">
                    <div className="golfer-tier-verbiage-cont">
                      <div className="golfer-num-admin">Name</div>
                      <div className="golfer-num-admin">Password</div>
                      <div className="golfer-num-admin">Paid</div>
                      <div className="golfer-num-admin">Golfer 1</div>
                      <div className="golfer-num-admin">Golfer 2</div>
                      <div className="golfer-num-admin">Golfer 3</div>
                      <div className="golfer-num-admin">Golfer 4</div>
                      <div className="golfer-num-admin">Golfer 5</div>
                      <div className="golfer-num-admin">Golfer 6</div>
                      <div className="golfer-num-admin">Winning Golfer</div>
                      <div className="golfer-num-admin">Tiebreaker</div>
                      <div className="golfer-num-admin">Tourney Stage</div>
                    </div>
                    <div className="golfer-option-cont">
                      <Input_Cont part={partObj} val="Name" setName={setName} />

                      <Input_Cont
                        part={partObj}
                        val="Password"
                        setPassword={setPassword}
                      />
                      <div>
                        <input
                          className="checkbox-cont"
                          type="checkbox"
                          defaultValue={paid}
                          onChange={togglePaid}
                          checked={paid ? paid : !!paid}
                        ></input>
                      </div>
                      <Input_Cont
                        part={partObj}
                        val="Golfer1"
                        setGolfer1={setGolfer1}
                      />
                      <Input_Cont
                        part={partObj}
                        val="Golfer2"
                        setGolfer2={setGolfer2}
                      />
                      <Input_Cont
                        part={partObj}
                        val="Golfer3"
                        setGolfer3={setGolfer3}
                      />
                      <Input_Cont
                        part={partObj}
                        val="Golfer4"
                        setGolfer4={setGolfer4}
                      />
                      <Input_Cont
                        part={partObj}
                        val="Golfer5"
                        setGolfer5={setGolfer5}
                      />
                      <Input_Cont
                        part={partObj}
                        val="Golfer6"
                        setGolfer6={setGolfer6}
                      />
                      <Input_Cont
                        part={partObj}
                        val="WinningGolfer"
                        setWinningGolfer={setWinningGolfer}
                      />
                      <Input_Cont
                        part={partObj}
                        val="Tiebreaker"
                        setTiebreaker={setTiebreaker}
                      />
                      <Input_Cont
                        part={partObj}
                        val="TourneyStage"
                        setTourneyStage={setTourneyStage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="edit-golfer-button-cont-no-picks">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Admin_Page;
