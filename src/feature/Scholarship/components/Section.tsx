import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AccordionItem from "../../../components/AccordionItem";

function Section(props: {
  title: string;
  markdown: string;
  collapsible?: boolean;
}) {
  const { title, markdown, collapsible } = props;
  return collapsible ? (
    <AccordionItem title={title}>
      {<ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />}
    </AccordionItem>
  ) : (
    <section>
      <h3>{title}</h3>
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
    </section>
  );
}

export default Section;
