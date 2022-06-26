import classes from "./Footer.module.scss";
function Footer() {
  return (
    <footer className={classes.footer}>
      <span>
        © {new Date().getFullYear()} IKS Interns. All Rights Reserved.{" "}
      </span>
      <span>
        Developed by&nbsp;
        <a href="https://interns.ieeekerala.org/">IKS Interns.</a>
      </span>
    </footer>
  );
}

export default Footer;
