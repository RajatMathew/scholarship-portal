import ErrorImg from "../../assets/error.webp";
import classes from "./ErrorPage.module.scss";

function ErrorPage() {
  return (
    <div className={classes.wrapper}>
      <img src={ErrorImg} alt="error " />
      <h1>Oops! Something went wrong...</h1>
    </div>
  );
}

export default ErrorPage;
