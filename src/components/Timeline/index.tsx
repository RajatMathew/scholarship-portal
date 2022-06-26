import { compareDesc, format } from "date-fns";
import { DetailedHTMLProps, HTMLAttributes, PropsWithRef } from "react";
import classes from "./Timeline.module.scss";

export interface TimelineElement {
  Date: string;
  Title: string;
  Description: string;
}

export interface TimelineProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items: TimelineElement[];
}

function Timeline(props: PropsWithRef<TimelineProps>) {
  const { items = [], ...rest } = props;
  return (
    <div className={classes.wrapper}>
      <div className={classes.timeline} {...rest}>
        {items.length > 0 &&
          items.map((i) => (
            <div
              key={i.Title}
              className={classes.timelineElement}
              data-finished={compareDesc(new Date(i.Date), new Date()) === 1}
            >
              <div className={classes.timelineElementContent}>
                <span className={classes.timelineElementDate}>
                  {format(new Date(i.Date), "dd MMM, yyy")}
                </span>
                <h3 className={classes.timelineElementTitle}>{i.Title}</h3>
                <p className={classes.timelineElementText}>{i.Description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Timeline;
