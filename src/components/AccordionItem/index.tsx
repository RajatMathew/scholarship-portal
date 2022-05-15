import React from "react";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Accordion.css";

export 

function Accordion() {
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <h3>Additional Info</h3>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>
          Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat
          ut occaecat consequat est minim minim esse tempor laborum consequat
          esse adipisicing eu reprehenderit enim.
        </p>
      </AccordionItemPanel>
    </AccordionItem>
  );
}

export default Accordion;
