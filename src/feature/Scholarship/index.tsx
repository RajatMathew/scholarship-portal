import classNames from "classnames/bind";
import times from "lodash/times";
import React, { createRef, useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { getInitiatorById, getScholarshipById } from "../../api";
import { Initiator } from "../../api/Initiator";
import { Scholarship as ScholarshipInterface } from "../../api/Scholarship";
import { ReactComponent as GlobeIcon } from "../../assets/globe.svg";
import { ReactComponent as ShareIcon } from "../../assets/share.svg";
import AccordionItem from "../../components/AccordionItem";
import Button from "../../components/Button";
import Timeline, { TimelineElement } from "../../components/Timeline";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import classes from "./Scholarship.module.scss";
import {
  selectInitiator,
  selectScholarship,
  setLoading,
  updateInitiatorDetails,
  updateScholarshipDetails,
} from "./scholarshipSlice";

let cx = classNames.bind(classes);

function Scholarship() {
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const simpleBar = createRef<SimpleBar>();

  useEffect(() => {
    simpleBar.current && simpleBar.current.recalculate();
    dispatch(setLoading(true));
    if (id) {
      getScholarshipById(parseInt(id)).then(
        (scholarship: ScholarshipInterface) => {
          if (scholarship != null) {
            dispatch(updateScholarshipDetails(scholarship));
            let initiator: Initiator[] = [];
            let initiatorRequestPromise = new Promise<void>(
              (resolve, reject) => {
                scholarship.initiators.forEach(async (id, index, array) => {
                  let currentInitiator = await getInitiatorById(id);
                  if (currentInitiator != null)
                    initiator.push(currentInitiator);
                  if (index === array.length - 1) resolve();
                });
              }
            );
            initiatorRequestPromise.then(() => {
              if (initiator != null) {
                dispatch(updateInitiatorDetails(initiator));
                dispatch(setLoading(false));
              }
            });
          }
        }
      );
    }
  }, []);

  const isLoading = useAppSelector((state) => state.scholarship.isLoading);

  const {
    name,
    coverImg,
    logoImg,
    description,
    timeline,
    content,
  }: ScholarshipInterface =
    useAppSelector(selectScholarship) || ({} as ScholarshipInterface);

  const initiatorDetails: Initiator[] | null = useAppSelector(selectInitiator);

  const isNotDesktop = useMediaQuery({ query: "(max-width: 850px)" });

  const aboutOrganization = !isLoading ? (
    initiatorDetails?.map(({ id, name, logo, description }) => (
      <section key={id}>
        <img
          className={classes.initiatorLogo}
          src={logo}
          aria-hidden="true"
          alt="Logo"
        />
        <h4>About {name}</h4>
        <p aria-labelledby={`About ${name}`}>{description}</p>
      </section>
    ))
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

  return (
    <SimpleBar ref={simpleBar} className={classes.container}>
      <>
        <header className={classes.header}>
          <div className={classes.title}>
            {!isLoading ? (
              name
            ) : (
              <Skeleton width={isNotDesktop ? "50%" : "30%"} />
            )}
          </div>
          <div className="search"></div>
        </header>
        <main>
          {!isLoading ? (
            <div className={classes.coverImg} data-loading="false">
              <img src={coverImg} />
            </div>
          ) : (
            <Skeleton containerClassName={classes.coverImg} height="100%" />
          )}
          <section className={classes.wrapper}>
            <section className={classes.content}>
              <div className={classes.contentWrapper}>
                {!isLoading ? (
                  <img
                    src={logoImg}
                    aria-hidden="true"
                    className={classes.logo}
                    alt="Logo"
                  />
                ) : (
                  <Skeleton className={classes.logo} />
                )}
                <h1>{!isLoading ? name : <Skeleton width="90%" />}</h1>
                {!isLoading ? (
                  <span>
                    by {initiatorDetails?.map((item) => item.name).join(", ")}
                  </span>
                ) : (
                  <Skeleton width="10ch" />
                )}
                <p aria-labelledby={name}>
                  {!isLoading ? description : <Skeleton count={3} />}
                </p>

                <div className={classes.btns}>
                  {!isLoading && (
                    <>
                      <Button
                        variant="text"
                        color="primary"
                        type="button"
                        rounded="pill"
                      >
                        <GlobeIcon />
                        Register now
                      </Button>
                      <Button color="secondary" variant="icon" type="button">
                        <ShareIcon />
                      </Button>
                    </>
                  )}
                </div>
                {!isLoading ? (
                  <>
                    <section>
                      <h3>Eligibility</h3>
                      <ul>
                        <li>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting - industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer
                        </li>
                        <li>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting - industry. Lorem Ipsum has been
                        </li>
                        <li>Lorem Ipsum is simply dum</li>
                      </ul>
                    </section>
                    <section>
                      <h3>Advantages of this program</h3>
                      <ul>
                        <li>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting - industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer
                        </li>
                        <li>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting - industry. Lorem Ipsum has been
                        </li>
                        <li>Lorem Ipsum is simply dum</li>
                      </ul>
                    </section>
                    <section>
                      <Accordion allowMultipleExpanded allowZeroExpanded>
                        <AccordionItem title="Additional Info">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting - industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer
                        </AccordionItem>
                        <AccordionItem title="Extra Info">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting - industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer
                          </p>
                        </AccordionItem>
                        <AccordionItem title="Frequently asked questions">
                          <AccordionItem
                            TitleComponent="h4"
                            title="What is the minimum age to apply?"
                            type="small"
                          >
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer n the industry's
                              standard dummy text ever since the 1500s, when an
                              unknown printer{" "}
                            </p>
                          </AccordionItem>{" "}
                          <AccordionItem
                            TitleComponent="h4"
                            title="What is the minimum age to apply?"
                            type="small"
                          >
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer n the industry's
                              standard dummy text ever since the 1500s, when an
                              unknown printer{" "}
                            </p>
                          </AccordionItem>{" "}
                          <AccordionItem
                            TitleComponent="h4"
                            title="What is the minimum age to apply?"
                            type="small"
                          >
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer n the industry's
                              standard dummy text ever since the 1500s, when an
                              unknown printer{" "}
                            </p>
                          </AccordionItem>
                        </AccordionItem>
                        {isNotDesktop && (
                          <AccordionItem title="Timeline">
                            <section>
                              <Timeline items={timeline as TimelineElement[]} />
                            </section>
                          </AccordionItem>
                        )}
                      </Accordion>
                    </section>
                  </>
                ) : (
                  times(3, () => (
                    <section>
                      <h3>
                        <Skeleton width="60%" />
                      </h3>
                      <p>
                        <Skeleton count={5} />
                      </p>
                    </section>
                  ))
                )}
                {isNotDesktop && aboutOrganization}
              </div>
            </section>

            {!isNotDesktop && (
              <section className={classes.rightSidebar}>
                {aboutOrganization}
                <section className={classes.timelineWrapper}>
                  <h2>{!isLoading ? "Timeline" : <Skeleton />}</h2>
                  {!isLoading ? (
                    <Timeline items={timeline as TimelineElement[]} />
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
}

export default Scholarship;
