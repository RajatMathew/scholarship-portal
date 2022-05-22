import classNames from "classnames/bind";
import { compareDesc } from "date-fns";
import { DetailedHTMLProps, HTMLAttributes, PropsWithRef } from "react";
import classes from "./Timeline.module.scss";

let cx = classNames.bind(classes);

export interface TimelineElement {
  date: string;
  title: string;
  description: string;
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
              key={i.title}
              className={classes.timelineElement}
              data-finished={compareDesc(new Date(i.date), new Date()) === 1}
            >
              <div className={classes.timelineElementContent}>
                <span className={classes.timelineElementDate}>{i.date}</span>
                <h3 className={classes.timelineElementTitle}>{i.title}</h3>
                <p className={classes.timelineElementText}>{i.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Timeline;
