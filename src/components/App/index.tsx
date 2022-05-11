import logo from "../../assets/logo.png";
import classes from "./App.module.scss";

function App() {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className="title">IEEE Richard E Merwin Scholarship</div>
        <div className="search"></div>
      </header>
      <main>
        <div className={classes.coverImg}>
          <img
            src={logo}
            aria-hidden="true"
            className={classes.logo}
            alt="Logo"
          />
        </div>
        <section className={classes.wrapper}>
          <section className={classes.content}>
            <div className={classes.contentWrapper}>
              <h1>IEEE Richard E Merwin Scholarship </h1>
            </div>
          </section>
          <section className={classes.rightSidebar}></section>
        </section>
      </main>
    </div>
  );
}

export default App;
