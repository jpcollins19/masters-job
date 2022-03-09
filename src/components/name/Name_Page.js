import { useSelector } from "react-redux";
import Name_Cont from "../my_picks/Name_Cont";
import { Link } from "react-router-dom";

const Name_Page = () => {
  const part = useSelector((state) => state.part);

  return (
    <main id="my-picks-page" className="white-text">
      <div className="main-cont">
        <div className="name-cont">
          <div>&nbsp;</div>
          <Name_Cont />
          <div className="part-picks-cont">
            <div className="part-picks-cont1"></div>
          </div>
          <Link
            to="/edit_name"
            className="white-text bold"
            style={{ textDecoration: "none" }}
          >
            Edit
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Name_Page;
