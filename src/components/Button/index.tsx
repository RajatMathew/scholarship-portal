import classNames from "classnames/bind";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classes from "./Button.module.scss";

let cx = classNames.bind(classes);

const Button = (
  props: React.PropsWithChildren<
    {
      color: "primary" | "secondary";
      variant: "icon" | "text";
    } & DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
) => {
  const { color = "primary", variant = "normal", children, ...rest } = props;
  const BtnClasses = cx("btn", {
    btnPrimary: color === "primary",
    btnSecondary: color === "secondary",
    btnIcon: variant === "icon",
  });
  return (
    <button className={BtnClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
