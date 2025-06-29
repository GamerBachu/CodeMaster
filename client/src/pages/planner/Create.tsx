import { Link, useParams } from "react-router";

const Create = () => {
  const { id } = useParams();

  return <div>Create:{id}
    
        <Link to={"/planner/create/0"}>Create</Link><br></br>
        <Link to={"/planner/update/0123123"}>update</Link><br></br>
        <Link to={"/planner/delete/asdqwe"}>delete</Link><br></br>
        </div>;
};

export default Create;  