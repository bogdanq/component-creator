import { WithContentResizeble } from "./content-resizeble-wrapper";
import { ElementsTree } from "./elements-workspace";

// рабочая область с компонентами
export const ContentArea = ({ contentRef, progress, contentWidth }) => {
  return (
    <WithContentResizeble
      contentRef={contentRef}
      progress={progress}
      contentWidth={contentWidth}
    >
      <ElementsTree progress={progress} />
    </WithContentResizeble>
  );
};
