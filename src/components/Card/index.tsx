import classNames from "classnames/bind";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import Button from "../Button";
import classes from "./Card.module.scss";

export type CardProps = {
  id?: string;
  logo?: string;
  title?: string;
  org?: string;
  description?: string;
  loading?: boolean;
};

let cx = classNames.bind(classes);
function Card(props: CardProps) {
  const { id, logo, title, org, description, loading } = props;
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      {/* <span className={cx("utag")}>
        <GenderF />
        &nbsp; Only for women
      </span> */}
      <div className={cx("imgWrapper")}>
        {loading ? (
          <Skeleton width="100%" height="100%" />
        ) : (
          <img alt={"logo"} src={`${logo}`} className={cx("img")} />
        )}
      </div>
      <div className={cx("content")}>
        <div className={cx("info")}>
          <div className={cx("title")}>
            {loading ? <Skeleton width="20ch" /> : title}
          </div>
          <div className={cx("org")}>
            {loading ? <Skeleton width="10ch" /> : `By ${org}`}
          </div>
          {/* <div className={cx("tags")}>
            <span className={cx("tag")}>IEEE</span>
            <span className={cx("tag")}>For 3rd and 4th years</span>
          </div> */}
        </div>

        <p>{loading ? <Skeleton count={5} width="20ch" /> : description}</p>
        {loading ? null : (
          <Button
            className={cx("vmBtn")}
            rounded="small"
            onClick={() => navigate(`scholarship/${id}`)}
          >
            Learn more&nbsp;
            <ArrowIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Card;
