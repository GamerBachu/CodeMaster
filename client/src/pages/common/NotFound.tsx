import locale from "../../resources/index";
import LinkBackToHome from "../../components/LinkBackToHome";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <h1>{locale.pageNotFound}</h1>
      <h5>
        <LinkBackToHome></LinkBackToHome>
      </h5>
    </div>
  );
};

export default NotFound;
