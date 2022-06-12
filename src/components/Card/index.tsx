import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { ReactComponent as GenderF } from "../../assets/gender-f.svg";
import Button from "../Button";
import classes from "./Card.module.scss";

let cx = classNames.bind(classes);
function Card() {
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <span className={cx("utag")}>
        <GenderF />
        &nbsp; Only for women
      </span>
      <img
        alt={""}
        src="https://source.unsplash.com/random/440x450/?red"
        className={cx("img")}
      />
      <div className={cx("content")}>
        <div className={cx("info")}>
          <div className={cx("title")}>IEEE Richard E Merwin Scholarship</div>
          <div className={cx("org")}>By IEEE</div>
          <div className={cx("tags")}>
            <span className={cx("tag")}>IEEE</span>
            <span className={cx("tag")}>For 3rd and 4th years</span>
          </div>
        </div>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum typesetting industry. Lorem Ipsum typesetting
          industry. Lorem Ipsum
        </p>
        <Button
          className={cx("vmBtn")}
          rounded="small"
          onClick={() => navigate("scholarships/1")}
        >
          View more&nbsp;
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
}

export default Card;
