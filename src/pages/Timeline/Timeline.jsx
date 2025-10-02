import Header from "../../components/Header/Header";
import { ScrollTimeline } from "../../components/scroll-timeline";

const Timeline = () => {
  return (
    <>
      <article>
        <Header
          title="Hành trình"
          subtitle="Những dấu mốc và trải nghiệm trên hành trình của mình"
        />
        
        <ScrollTimeline />
      </article>
    </>
  );
};

export default Timeline;
