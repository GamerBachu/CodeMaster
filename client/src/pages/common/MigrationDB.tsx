import { useEffect } from "react";
import LocalDb from "../../database/LocalDb/LocalDb";

const MigrationDB = () => {
 
  useEffect(() => {
    const d = new LocalDb();
    d.init();

    return () => {};
  }, []);

  return <div>loading</div>;
};

export default MigrationDB;
