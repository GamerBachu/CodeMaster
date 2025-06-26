import { useParams } from "react-router";

const Delete = () => {
  const { id } = useParams();

  return <div>Delete:{id}</div>;
};

export default Delete; 