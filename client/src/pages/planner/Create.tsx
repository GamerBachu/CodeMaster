import { useParams } from "react-router";

const Create = () => {
  const { id } = useParams();

  return <div>Create:{id}</div>;
};

export default Create;  