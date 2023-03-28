import { Element } from "../model";
import { Button, Shape, Image, Text, Link } from "./styled";

export const ElementItem = ({
  element,
  className,
}: {
  element: Element;
  className: string;
}) => {
  const { type } = element;

  if (type === "shape") {
    return <Shape className={`shape content-area ${className}`} />;
  }

  if (type === "image") {
    return <Image className={`image content-area ${className}`} />;
  }

  if (type === "button") {
    return (
      <Button
        className={`button content-area ${className}`}
        html="button"
        tagName="article"
      />
    );
  }

  if (type === "text") {
    return (
      <Text
        className={`text content-area ${className}`}
        html="text"
        tagName="article"
      />
    );
  }

  if (type === "link") {
    return (
      <Link
        className={`link content-area ${className}`}
        html="link"
        tagName="article"
      />
    );
  }

  return null;
};
