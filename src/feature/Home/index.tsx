import { times } from "lodash";
import { createRef, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import HeroImage from "../../assets/hero.png";
import IEEELogo from "../../assets/ieee.png";
import MintLogo from "../../assets/mint-logo.png";
import Button from "../../components/Button";
import Card from "../../components/Card";
import classes from "./Home.module.scss";

function Home() {
  const simpleBar = createRef<SimpleBar>();

  // const handleScroll: WheelEventHandler<HTMLElement> = (evt) => {
  //   evt.preventDefault();
  //   simpleBarHorizontal.current?.scrollLeft += evt.deltaY;
  // };

  useEffect(() => {
    simpleBar.current && simpleBar.current.recalculate();
  }, []);

  const firstSectionRef = createRef<HTMLDivElement>();
  return (
    <SimpleBar ref={simpleBar} className={classes.container}>
      <section className={classes.hero}>
        <img className={classes.Logo} src={MintLogo} width={70} />

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
          <SimpleBar>
            <div className={classes.orgsContent}>
              {times(6, () => (
                <a href="#" className={classes.org}>
                  <img src={IEEELogo} className={classes.orgImg} />
                </a>
              ))}
            </div>
          </SimpleBar>
        </section>
        <section className={classes.orgs}>
          <h1>Scholarships from IEEE</h1>

          <div className={classes.orgsContent}>
            <Card />
          </div>
        </section>
      </main>
      <footer className={classes.footer}>
        <div className={classes.footerLogo}>
          <div>
            <img className={classes.Logo} src={MintLogo} width={100} />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum typesetting industry. Lorem Ipsum
              typesetting industry. Lorem Ipsum
            </p>
          </div>
        </div>
        <div className={classes.footerContent}>
        div.footerContentLinks
        </div>
      </footer>
    </SimpleBar>
  );
}

export default Home;
