import { useParams } from "react-router";

const Update = () => {
  const { id } = useParams();

  return <div>Update:{id}</div>;
};

export default Update;
