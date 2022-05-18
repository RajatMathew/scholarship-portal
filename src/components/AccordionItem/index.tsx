import React from "react";
import {
  AccordionItem,
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

const AccordionItm = (props: React.PropsWithChildren<AccordionItemProps>) => {
  const {
    title,
    children,
    TitleComponent = "h3",
    TitleComponentProps,
    type = "large",
  } = props;
  return (
    <AccordionItem data-size={type}>
      <AccordionItemHeading>
        <AccordionItemButton>
          {React.createElement(TitleComponent, {
            children: title,
            ...TitleComponentProps,
          })}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel data-size={type}>{children}</AccordionItemPanel>
    </AccordionItem>
  );
};

export default AccordionItm;
