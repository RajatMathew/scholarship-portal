import { createRef, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { useQuery } from "urql";
import { BASE_URL } from "../../api";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import HeroImage from "../../assets/hero.png";
import MainLogo from "../../assets/main-logo-Banner.png";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { ORGANIZATION_DATA, SCHOLARSHIP_DATA } from "./getData";
import classes from "./Home.module.scss";

function Home() {
  const simpleBar = createRef<SimpleBar>();
  const typeRef = useRef<(HTMLElement | null)[]>([]);

  const types = [
    { type: "scholarship", text: "Scholarships" },
    { type: "internship", text: "Internships" },
    { type: "award", text: "Awards" },
    { type: "funding", text: "Funds & Grants" },
    { type: "fellowship", text: "Fellowships" },
    { type: "contest", text: "Contests" },
  ];

  const [{ data: scholarships, fetching, error }] = useQuery({
    query: SCHOLARSHIP_DATA,
  });

  console.log(scholarships);
  const [{ data: organizations, fetching: loadingOrg, error: errorOrg }] =
    useQuery({
      query: ORGANIZATION_DATA,
    });
  console.log(organizations?.organizations.data);
  //const isNotDesktop = useMediaQuery({ query: "(max-width: 850px)" });

  useEffect(() => {
    simpleBar.current && simpleBar.current.recalculate();
  }, [simpleBar]);

  const firstSectionRef = createRef<HTMLDivElement>();
  return (
    <SimpleBar ref={simpleBar} className={classes.container}>
      <section className={classes.hero}>
        <img
          className={classes.Logo}
          src={MainLogo}
          width={150}
          alt="INSIGHTER"
        />

        <div className={classes.heroText}>
          <div className={classes.heroTextContent}>
            <div className={classes.heroTextTitle}>
              Find the right opportunities for you
            </div>
            <Button
              onClick={() =>
                firstSectionRef.current &&
                firstSectionRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              EXPLORE
              <ArrowIcon />
            </Button>
          </div>
        </div>
        <div className={classes.heroImg}>
          <img
            aria-hidden="true"
            alt="Hero image"
            src={HeroImage}
            draggable="false"
          />
        </div>
      </section>
      <main>
        <section className={classes.categories} ref={firstSectionRef}>
          <h1>Categories</h1>

          <div className={classes.categoriesContent}>
            {types.map((type, idx) => (
              <div
                onClick={() => {
                  typeRef.current[idx]?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                  });
                }}
                className={classes.categoryItem}
              >
                <div className={classes.categoryItemText}>
                  <h1>{type.text}</h1>
                  <p>From IEEE, Gracehopper, Computer society and more</p>
                </div>
                <div className={classes.categoryItemImg}></div>
              </div>
            ))}
          </div>
        </section>
        <section className={classes.orgs}>
          <h1>{fetching ? <Skeleton width="30ch" /> : "Powered by"} </h1>
          <div className={classes.orgsContent}>
            {!fetching ? (
              organizations?.organizations.data.map((org: any) => (
                <div className={classes.org}>
                  <img
                    src={`${BASE_URL}${org.attributes.Logo.data.attributes.url}`}
                    className={classes.orgImg}
                    alt={org.attributes.Name}
                  />
                </div>
              ))
            ) : (
              <Skeleton
                style={{ boxShadow: "none", border: 0 }}
                className={classes.org}
              />
            )}
          </div>
        </section>
        {!fetching ? (
          types.map((type, idx) => (
            <section
              className={classes.orgs}
              key={type.type}
              ref={(el) => (typeRef.current[idx] = el)}
            >
              <h1>{type.text}</h1>
              <div className={classes.cards}>
                {(function () {
                  let sch = scholarships?.scholarships.data.filter(
                    (i: any) => i.attributes.Type === type.type.toLowerCase()
                  );
                  return sch?.length > 0 ? (
                    sch?.map((scholarship: any) => (
                      <Card
                        logo={`${BASE_URL}${scholarship.attributes.Logo.data.attributes.url}`}
                        title={scholarship.attributes.Name}
                        description={scholarship.attributes.Description}
                        org={
                          scholarship.attributes.Organization.data.attributes
                            .Name
                        }
                        id={scholarship.id}
                      />
                    ))
                  ) : (
                    <span className={classes.error}>
                      Nothing seems to be available now. Please check back
                      later.
                    </span>
                  );
                })()}
              </div>
            </section>
          ))
        ) : (
          <section className={classes.orgs}>
            <h1>
              <Skeleton width={"20ch"} />
            </h1>
            <Card loading />
          </section>
        )}
      </main>
      <footer className={classes.footer}>
        © 2022 IKS Interns. All Rights Reserved. <br /> Developed by&nbsp;
        <Link to="https://interns.ieeekerala.org/">IKS Interns.</Link>
      </footer>
    </SimpleBar>
  );
}

export default Home;
