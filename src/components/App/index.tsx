import classNames from "classnames/bind";
import { compareDesc } from "date-fns";
import { Accordion } from "react-accessible-accordion";
import { ReactComponent as GlobeIcon } from "../../assets/globe.svg";
import logo from "../../assets/logo.png";
import AccordionItem from "../AccordionItem";
import classes from "./App.module.scss";

let cx = classNames.bind(classes);

function App() {
  let items = [
    {
      date: "03 MAY, 2022",
      title: "Registration",
      description:
        "since the 1500s, when an unknown printer n the industry's standard dummy ",
    },
    {
      date: "07 MAY, 2022",
      title: "Interview",
      description:
        "since the 1500s, when an unknown printer n the industry's standard dummy ",
    },
    {
      date: "17 MAY, 2022",
      title: "Result Announcement",
      description:
        "since the 1500s, when an unknown printer n the industry's standard dummy ",
    },
  ];
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className="title">IEEE Richard E Merwin Scholarship</div>
        <div className="search"></div>
      </header>
      <main>
        <div className={classes.coverImg}></div>
        <section className={classes.wrapper}>
          <section className={classes.content}>
            <div className={classes.contentWrapper}>
              <img
                src={logo}
                aria-hidden="true"
                className={classes.logo}
                alt="Logo"
              />
              <h1>IEEE Richard E Merwin Scholarship </h1>
              <span>By IEEE</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer n the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer and so.
              </p>
              <button className={cx("btn", "btnPrimary")} type="button">
                <GlobeIcon />
                Register now
              </button>
              <section>
                <h3>Eligibility</h3>
                <ul>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting - industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer
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
                    typesetting - industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer
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
                  <AccordionItem />
                  <AccordionItem />
                  <AccordionItem />
                  <AccordionItem />
                </Accordion>
              </section>
            </div>
          </section>

          <section className={classes.rightSidebar}>
            <div className={classes.timeline}>
              {items.map((i) => (
                <div
                  key={i.title}
                  className={classes.timelineElement}
                  data-finished={
                    compareDesc(new Date(i.date), new Date()) === 1
                  }
                >
                  <div className={classes.timelineElementContent}>
                    <span className={classes.timelineElementDate}>
                      {i.date}
                    </span>
                    <h3 className={classes.timelineElementTitle}>{i.title}</h3>
                    <p className={classes.timelineElementText}>
                      {i.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
