import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { createRef, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import SimpleBar from "simplebar-react";
import { useQuery } from "urql";
import { BASE_URL } from "../../api";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import HeroImage from "../../assets/hero.webp";
import MainLogo from "../../assets/main-logo-Banner.webp";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import ErrorPage from "../ErrorPage";
import { ORGANIZATION_DATA, SCHOLARSHIP_DATA } from "./getData";
import classes from "./Home.module.scss";

const types = [
  { type: "scholarship", text: "Scholarships" },
  { type: "internship", text: "Internships" },
  { type: "award", text: "Awards" },
  { type: "grants", text: "Funds & Grants" },
  { type: "fellowship", text: "Fellowships" },
  { type: "contest", text: "Contests" },
];

const categorize = function (scholarships: any) {
  const categorized = types.reduce((acc: any, type) => {
    acc[`${type.type}`] = scholarships?.scholarships.data.filter(
      (scholarship: any) => scholarship.attributes.Type === type.type
    );
    return acc;
  }, {});
  return categorized;
};

function Home() {
  const simpleBar = createRef<SimpleBar>();
  const typeRef = useRef<(HTMLElement | null)[]>([]);
  const _num = Math.floor(window.innerWidth / 340);
  const [visible, setVisible] = useState(_num === 0 ? 1 : _num);

  useEffect(() => {
    simpleBar.current && simpleBar.current.recalculate();
  }, [simpleBar]);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      let num = Math.floor(window.innerWidth / 340);
      setVisible(num === 0 ? 1 : num);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const [{ data: scholarships, fetching, error }] = useQuery({
    query: SCHOLARSHIP_DATA,
  });

  const scholarshipsCategories = scholarships && categorize(scholarships);

  const [{ data: organizations, fetching: loadingOrg, error: errorOrg }] =
    useQuery({
      query: ORGANIZATION_DATA,
    });

  if (error || errorOrg) return <ErrorPage />;

  //const isNotDesktop = useMediaQuery({ query: "(max-width: 850px)" });

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
                key={idx}
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
          <h1>{loadingOrg ? <Skeleton width="10ch" /> : "Powered by"} </h1>
          <div className={classes.orgsContent}>
            {!fetching ? (
              organizations?.organizations.data.map((org: any, idx: number) => (
                <div className={classes.org} key={idx}>
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
          Object.keys(scholarshipsCategories).map((type, idx) => (
            <CarouselProvider
              naturalSlideWidth={320}
              naturalSlideHeight={200}
              totalSlides={scholarshipsCategories[type]?.length}
              isIntrinsicHeight
              key={type}
              visibleSlides={visible}
            >
              <section
                className={classes.orgs}
                ref={(el) => (typeRef.current[idx] = el)}
              >
                <h1>{types.find((t) => t.type === type)?.text}</h1>
                {scholarshipsCategories[type]?.length > 0 ? (
                  <>
                    <Slider classNameTray={classes.cards}>
                      {scholarshipsCategories[type]?.map(
                        (scholarship: any, idx: number) => (
                          <Slide index={idx} key={scholarship.id}>
                            <Card
                              logo={`${BASE_URL}${scholarship.attributes.Logo.data.attributes.url}`}
                              title={scholarship.attributes.Name}
                              description={scholarship.attributes.Description}
                              org={
                                scholarship.attributes.Organization.data
                                  .attributes.Name
                              }
                              id={scholarship.id}
                            />
                          </Slide>
                        )
                      )}
                    </Slider>
                    {scholarshipsCategories[type].length > visible ? (
                      <>
                        <ButtonBack className={classes.btnBack}>
                          <svg
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
                          </svg>
                        </ButtonBack>
                        <ButtonNext className={classes.btnNext}>
                          <svg
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                          </svg>
                        </ButtonNext>
                      </>
                    ) : null}
                  </>
                ) : (
                  <span className={classes.error}>
                    Nothing seems to be available now. Please check back later.
                  </span>
                )}
              </section>
            </CarouselProvider>
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
      <Footer />
    </SimpleBar>
  );
}

export default Home;
