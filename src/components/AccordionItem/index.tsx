import React from "react";
import {
  AccordionItem as AT,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Accordion.css";

export interface AccordionItemProps {
  TitleComponent?:
    | string
    | React.FunctionComponent<any>
    | React.ComponentClass<any, any>;
  TitleComponentProps?: React.ComponentProps<any>;
  title?: string;
  type?: "small" | "large";
}

const AccordionItem = (props: React.PropsWithChildren<AccordionItemProps>) => {
  const {
    title,
    children,
    TitleComponent = "h3",
    TitleComponentProps,
    type = "large",
  } = props;
  return (
    <AT data-size={type}>
      <AccordionItemHeading>
        <AccordionItemButton>
          {React.createElement(TitleComponent, {
            children: title,
            ...TitleComponentProps,
          })}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel data-size={type}>{children}</AccordionItemPanel>
    </AT>
  );
};

export default AccordionItem;
