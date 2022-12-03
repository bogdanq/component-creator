import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Button,
  Stack,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { addElementToTree } from "../model";
import { AddButton, MenuWrapper, Image } from "./styled";

const SIZE = [
  {
    img: "https://tilda.cc/zero/img/tn-razreshenie_1a.svg",
    size: 320,
    name: "320-480",
  },
  {
    img: "https://tilda.cc/zero/img/tn-razreshenie_2a.svg",
    size: 480,
    name: "480-640",
  },
  {
    img: "https://tilda.cc/zero/img/tn-razreshenie_3a.svg",
    size: 640,
    name: "640-960",
  },
  {
    img: "https://tilda.cc/zero/img/tn-razreshenie_4a.svg",
    size: 960,
    name: "960-1200",
  },
  {
    img: "https://tilda.cc/zero/img/tn-razreshenie_5a.svg",
    size: 1200,
    name: "1200-max",
  },
];

export const Header = ({
  zoomReset,
  progress,
  handleChangeWidth,
  contentWidth,
}) => {
  return (
    <MenuWrapper>
      <Flex alignItems="center" w="12%" justifyContent="space-between">
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <AddButton />
          </PopoverTrigger>

          <PopoverContent w="250px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Select element</PopoverHeader>
            <PopoverBody>
              <Stack align="start">
                <Button
                  onClick={() => addElementToTree("text")}
                  colorScheme="teal"
                  variant="link"
                  justifyContent="start"
                >
                  Text
                </Button>
                <Button
                  onClick={() => addElementToTree("button")}
                  colorScheme="teal"
                  textAlign="left"
                  variant="link"
                  justifyContent="start"
                >
                  Button
                </Button>
                <Button
                  onClick={() => addElementToTree("image")}
                  colorScheme="teal"
                  textAlign="left"
                  variant="link"
                  justifyContent="start"
                >
                  Image
                </Button>
                <Button
                  onClick={() => addElementToTree("shape")}
                  colorScheme="teal"
                  textAlign="left"
                  variant="link"
                  justifyContent="start"
                >
                  Shape
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <p>{progress} %</p>
        <Button
          onClick={zoomReset}
          size="sm"
          background="white"
          colorScheme="black"
          color="black"
        >
          reset
        </Button>
      </Flex>

      <Flex justifyContent="center">
        {SIZE.map((i) => (
          <Tooltip key={i.img} label={i.name}>
            <Image
              imageActive={i.size === contentWidth}
              src={i.img}
              onClick={() => handleChangeWidth(i.size)}
              alt="mobile"
            />
          </Tooltip>
        ))}
      </Flex>

      <Flex w="10%">
        <Button background="white" size="sm" colorScheme="black" color="black">
          save
        </Button>
      </Flex>
    </MenuWrapper>
  );
};
