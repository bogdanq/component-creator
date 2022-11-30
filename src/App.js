import { useState } from "react";
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
  Box,
  Text,
} from "@chakra-ui/react";
import { Resizable } from "react-resizable";
import { Tree } from "./tree";
import { useZoom } from "./use-zoom";
import "./app.css";
import {
  $activeElement,
  addComponentToTree,
  removeComponentFromTree,
} from "./model";
import classNames from "classnames";
import { useStore } from "effector-react";

const GRID_WIDTH = 102;

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

const PaperResizeble = ({ contentRef, progress, width }) => {
  const [height, setHeight] = useState(600);

  const onResize = (_, { size }) => {
    setHeight(size.height);
  };

  const gridCount = Math.ceil(width / GRID_WIDTH);

  return (
    <Resizable height={height} width={width} onResize={onResize}>
      <div
        ref={contentRef}
        className="content"
        style={{ width: `${width}px`, height }}
      >
        <Tree progress={progress} />

        {Array.from({ length: gridCount }).map((_, index) => (
          <div
            className="content-grid"
            key={index}
            style={{ left: index * GRID_WIDTH }}
          />
        ))}
      </div>
    </Resizable>
  );
};

const ElementsSettingsBlock = ({ activeElement }) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex w="35%">
          <Text fontSize="sm">Actions</Text>
        </Flex>

        <Flex justifyContent="space-between" w="65%">
          <Button
            colorScheme="black"
            color="black"
            border="1px solid rgba(0,0,0,.2)"
            size="xs"
            onClick={() => removeComponentFromTree(activeElement.id)}
          >
            Delete
          </Button>
          <Button
            colorScheme="black"
            color="black"
            border="1px solid rgba(0,0,0,.2)"
            size="xs"
          >
            Copy
          </Button>
          <Button
            colorScheme="black"
            color="black"
            border="1px solid rgba(0,0,0,.2)"
            size="xs"
          >
            Lock
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export function App() {
  const { wrapperRef, zoomReset, contentRef, progress } = useZoom();

  const [w, sw] = useState(1200);

  const activeElement = useStore($activeElement);

  const hendleChangeWidth = (w) => {
    zoomReset();
    sw(w);
  };

  return (
    <div>
      <div ref={wrapperRef} className="zoom-work">
        <div className="tn-mainmenu">
          <Flex alignItems="center" w="12%" justifyContent="space-between">
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <button className="addBtn" />
              </PopoverTrigger>
              <PopoverContent w="250px">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Select element</PopoverHeader>
                <PopoverBody>
                  <Stack align="start">
                    <Button
                      onClick={() => addComponentToTree("text")}
                      colorScheme="teal"
                      variant="link"
                      justifyContent="start"
                    >
                      Text
                    </Button>
                    <Button
                      onClick={() => addComponentToTree("button")}
                      colorScheme="teal"
                      textAlign="left"
                      variant="link"
                      justifyContent="start"
                    >
                      Button
                    </Button>
                    <Button
                      onClick={() => addComponentToTree("image")}
                      colorScheme="teal"
                      textAlign="left"
                      variant="link"
                      justifyContent="start"
                    >
                      Image
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
                <img
                  className={classNames({ imageActive: i.size === w })}
                  src={i.img}
                  onClick={() => hendleChangeWidth(i.size)}
                  alt="mobile"
                />
              </Tooltip>
            ))}
          </Flex>

          <Flex w="10%">
            <Button
              background="white"
              size="sm"
              colorScheme="black"
              color="black"
            >
              save
            </Button>
          </Flex>
        </div>
        <div className="tn-right-box">
          <div className="tn-right__header">
            <Text textTransform="uppercase" fontSize="sm">
              Artboard settings
            </Text>

            {activeElement && (
              <ElementsSettingsBlock activeElement={activeElement} />
            )}
          </div>
        </div>

        <PaperResizeble contentRef={contentRef} progress={progress} width={w} />
      </div>
    </div>
  );
}
