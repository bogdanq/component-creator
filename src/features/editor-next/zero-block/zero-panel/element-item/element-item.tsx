import { Element } from "../../../model";
import { Button, Shape, Image, Text, Link } from "./styled";

export const ElementItem = ({ element }: { element: Element }) => {
  const { type } = element;

  if (type === "shape") {
    return <Shape className={`shape content-area handle`} />;
  }

  if (type === "image") {
    return <Image className={`image content-area handle`} />;
  }

  if (type === "button") {
    return (
      <Button
        className={`button content-area handle`}
        html="button"
        tagName="article"
      />
    );
  }

  if (type === "text") {
    return (
      <Text
        className={`text content-area handle`}
        html="text"
        tagName="article"
      />
    );
  }

  if (type === "link") {
    return (
      <Link
        className={`link content-area handle`}
        html="link"
        tagName="article"
      />
    );
  }

  return null;
};
