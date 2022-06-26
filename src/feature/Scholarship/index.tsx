import { createRef, useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { useQuery } from "urql";
import { BASE_URL } from "../../api";
import { ReactComponent as GlobeIcon } from "../../assets/globe.svg";
import { ReactComponent as ShareIcon } from "../../assets/share.svg";
import AccordionItem from "../../components/AccordionItem";
import Button from "../../components/Button";
import Timeline, { TimelineElement } from "../../components/Timeline";
import AboutOrganization from "./components/AboutOrganization";
import Header from "./components/Header";
import Section from "./components/Section";
import getScholarship from "./getScholarship";
import { ScholarshipDetails } from "./interfaces";
import classes from "./Scholarship.module.scss";

function Scholarship() {
  let { id } = useParams();
  const [result] = useQuery<ScholarshipDetails>({
    query: getScholarship(id ? id : "1"),
  });
  const { data, fetching, error } = result;

  const simpleBar = createRef<SimpleBar>();

  useEffect(() => {
    simpleBar.current && simpleBar.current.recalculate();
  }, [simpleBar]);

  const isNotDesktop = useMediaQuery({ query: "(max-width: 850px)" });

  const ScholarshipDetails = data?.scholarship.data.attributes;

  const OrganizationDetails = ScholarshipDetails?.Organization;
  const TimelineDetails = ScholarshipDetails?.Timeline;
  const Sections = ScholarshipDetails?.Sections;
  const FAQs = ScholarshipDetails?.FAQs;

  const aboutOrganization = (
    <AboutOrganization loading={fetching} organization={OrganizationDetails} />
  );

  return (
    <SimpleBar ref={simpleBar} className={classes.container}>
      <>
        <Header />
        <main>
          {!fetching ? (
            <div className={classes.coverImg} data-loading="false">
              <img
                src={
                  "https://source.unsplash.com/random/640x1200/?nature,mountains,blue"
                }
                alt="cover"
              />
            </div>
          ) : (
            <Skeleton containerClassName={classes.coverImg} height="100%" />
          )}
          <section className={classes.wrapper}>
            <section className={classes.content}>
              <div className={classes.contentWrapper}>
                {!fetching ? (
                  <img
                    src={`${BASE_URL}${ScholarshipDetails?.Logo.data.attributes.url}`}
                    aria-hidden="true"
                    className={classes.logo}
                    alt="Logo"
                  />
                ) : (
                  <Skeleton className={classes.logo} />
                )}
                <h1>
                  {!fetching ? (
                    ScholarshipDetails?.Name
                  ) : (
                    <Skeleton width="90%" />
                  )}
                </h1>
                {!fetching ? (
                  <span>by {OrganizationDetails?.data.attributes.Name}</span>
                ) : (
                  <Skeleton width="10ch" />
                )}
                <p aria-labelledby={OrganizationDetails?.data.attributes.Name}>
                  {!fetching ? (
                    OrganizationDetails?.data.attributes.Description
                  ) : (
                    <Skeleton count={3} />
                  )}
                </p>

                <div className={classes.btns}>
                  {!fetching && (
                    <>
                      <Button
                        variant="text"
                        color="primary"
                        type="button"
                        rounded="pill"
                        onClick={() =>
                          window.open(ScholarshipDetails?.Link, "_blank")
                        }
                      >
                        <GlobeIcon />
                        Learn more
                      </Button>
                      {isNotDesktop ? (
                        <Button
                          color="secondary"
                          variant="icon"
                          type="button"
                          onClick={() => {
                            navigator.share({
                              url: window.location.href,
                              text: `${ScholarshipDetails?.Name} by ${OrganizationDetails?.data.attributes.Name}`,
                              title: `${ScholarshipDetails?.Name} by ${OrganizationDetails?.data.attributes.Name}`,
                            });
                          }}
                        >
                          <ShareIcon />
                        </Button>
                      ) : null}
                    </>
                  )}
                </div>
                <Accordion allowMultipleExpanded allowZeroExpanded>
                  {!fetching ? (
                    <>
                      {Sections?.map((section) => (
                        <Section
                          title={section.Title}
                          key={section.id}
                          markdown={section.Content}
                          collapsible={section.Collapsible}
                        />
                      ))}
                      <AccordionItem title="Frequently asked questions">
                        {FAQs?.map((FAQ) => (
                          <AccordionItem
                            type="small"
                            TitleComponent={"h4"}
                            title={FAQ.Question}
                            key={FAQ.id}
                          >
                            {FAQ.Answer}
                          </AccordionItem>
                        ))}
                      </AccordionItem>
                      {isNotDesktop && (
                        <AccordionItem title="Timeline">
                          <section>
                            <Timeline
                              items={TimelineDetails as TimelineElement[]}
                            />
                          </section>
                        </AccordionItem>
                      )}
                    </>
                  ) : (
                    <section>
                      <h3>
                        <Skeleton width="60%" />
                      </h3>
                      <p>
                        <Skeleton count={5} />
                      </p>
                    </section>
                  )}
                  {isNotDesktop && (
                    <section>
                      <br />
                      {aboutOrganization}
                    </section>
                  )}
                </Accordion>
              </div>
            </section>

            {!isNotDesktop && (
              <section className={classes.rightSidebar}>
                {aboutOrganization}
                <section className={classes.timelineWrapper}>
                  <h2>{!fetching ? "Timeline" : <Skeleton />}</h2>
                  {!fetching ? (
                    <Timeline items={TimelineDetails as TimelineElement[]} />
                  ) : (
                    <Skeleton count={10} />
                  )}
                </section>
              </section>
            )}
          </section>
        </main>
      </>
    </SimpleBar>
  );
  // );
}

export default Scholarship;
