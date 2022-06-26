import Skeleton from "react-loading-skeleton";
import { BASE_URL } from "../../../api";
import { Organization } from "../interfaces";
import classes from "./AboutOrganization.module.scss";

function AboutOrganization(props: {
  loading?: boolean;
  organization?: Organization;
}) {
  const { loading, organization } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = organization?.data.id;
  const name = organization?.data.attributes.Name;
  const description = organization?.data.attributes.Description;
  const logo = organization?.data.attributes.Logo.data.attributes.url;

  return !loading ? (
    <section>
      <img
        className={classes.initiatorLogo}
        src={`${BASE_URL}${logo}`}
        aria-hidden="true"
        alt="Logo"
      />
      <h4>About {name}</h4>
      <p aria-labelledby={`About ${name}`}>{description}</p>
    </section>
  ) : (
    <section>
      <p>
        <Skeleton width="10ch" height="5ch" />
      </p>
      <h4>
        <Skeleton width={"8ch"} />
      </h4>
      <p>
        <Skeleton count={5} />
      </p>
    </section>
  );
}

export default AboutOrganization;
