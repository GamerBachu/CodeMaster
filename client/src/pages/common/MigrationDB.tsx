import { useState } from "react";
import LocalDb from "../../database/localDb/LocalDb";
import seed from "../../database/seed";
import locale from "../../resources";
import { Link } from "react-router";
import appRoute from "../../routes/appRoute";

const MigrationDB = () => {

  const [msg, setMsg] = useState("apply migration...");

  const handleClick = () => {
    const d = new LocalDb();
    d.init().then(() => {
      setMsg("migration applied successfully");
      seed();
    }).catch((e) => {
      setMsg("migration failed: " + e.message);
    });
  };


  return (<div className="d-flex justify-content-center align-items-center vh-100">

    <div className="center-box">
      <div className="mt-3"  >
        <p className="text-secondary" style={{ width: "300px", margin: "0 auto" }}>
          {locale.demoDisclaimerContent}
        </p>
      </div>

      <div className="mt-3"  >
        <button
          className="btn btn-primary"
          onClick={handleClick}
        >
          {msg}
        </button>
      </div>

      <div className="mt-3"  >
        <Link className="btn btn-link text-secondary" to={appRoute.LOGIN.path}>
          {locale.alreadyHaveAccount}
        </Link>
      </div>



    </div>;
  </div>);
};

export default MigrationDB;
