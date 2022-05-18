import classNames from "classnames/bind";
import React, { createRef, useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { useParams } from "react-router-dom";
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
  updateInitiatorDetails,
  updateScholarshipDetails,
} from "./scholarshipSlice";

let cx = classNames.bind(classes);

function Scholarship() {
  const divRef = createRef<HTMLDivElement>();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  useEffect(() => {
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
              }
            });
          }
        }
      );
    }
  }, [id]);

  const scholarshipDetails: ScholarshipInterface | null =
    useAppSelector(selectScholarship);
  const initiatorDetails: Initiator[] | null = useAppSelector(selectInitiator);

  return (
    <div ref={divRef} className={classes.container}>
      {scholarshipDetails ? (
        initiatorDetails && (
          <>
            <header className={classes.header}>
              <div className="title">{scholarshipDetails.name}</div>
              <div className="search"></div>
            </header>
            <main>
              <div
                style={
                  {
                    "--cover-img": `url(${scholarshipDetails.coverImg})`,
                  } as React.CSSProperties
                }
                className={classes.coverImg}
              ></div>
              <section className={classes.wrapper}>
                <section className={classes.content}>
                  <div className={classes.contentWrapper}>
                    <img
                      src={scholarshipDetails.logoImg}
                      aria-hidden="true"
                      className={classes.logo}
                      alt="Logo"
                    />
                    <h1>{scholarshipDetails.name}</h1>
                    <span>
                      by {initiatorDetails.map((item) => item.name).join(", ")}
                    </span>
                    <p aria-labelledby={scholarshipDetails.name}>
                      {scholarshipDetails.description}
                    </p>
                    <div className={classes.btns}>
                      <Button variant="text" color="primary" type="button">
                        <GlobeIcon />
                        Register now
                      </Button>
                      <Button color="secondary" variant="icon" type="button">
                        <ShareIcon />
                      </Button>
                    </div>
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
                      </Accordion>
                    </section>
                  </div>
                </section>

                <section className={classes.rightSidebar}>
                  {initiatorDetails.map(({ id, name, logo, description }) => (
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
                  ))}
                  <section className={classes.timelineWrapper}>
                    <h2>Timeline</h2>
                    <Timeline
                      items={scholarshipDetails.timeline as TimelineElement[]}
                    />
                  </section>
                </section>
              </section>
            </main>
          </>
        )
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default Scholarship;
