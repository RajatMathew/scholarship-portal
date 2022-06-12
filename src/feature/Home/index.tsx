import { times } from "lodash";
import { createRef, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import HeroImage from "../../assets/hero.png";
import Button from "../../components/Button";
import Card from "../../components/Card";
import classes from "./Home.module.scss";

function Home() {
  const simpleBar = createRef<SimpleBar>();

  useEffect(() => {
    simpleBar.current && simpleBar.current.recalculate();
  }, []);

  const firstSectionRef = createRef<HTMLDivElement>();
  return (
    <SimpleBar ref={simpleBar} className={classes.container}>
      <section className={classes.hero}>
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
            {times(6, () => (
              <div className={classes.categoryItem}>
                <div className={classes.categoryItemText}>
                  <h1>Scholarships</h1>
                  <p>From IEEE, Gracehopper, Computer society and more</p>
                </div>
                <div className={classes.categoryItemImg}></div>
              </div>
            ))}
          </div>
        </section>
        <section className={classes.orgs}>
          <h1>Browse by organizations</h1>

          <div className={classes.orgsContent}>
            {times(6, () => (
              <div className={classes.org}>
                <img src="" className={classes.orgImg} />
              </div>
            ))}
          </div>
          <Card />
        </section>
      </main>
    </SimpleBar>
  );
}

export default Home;
