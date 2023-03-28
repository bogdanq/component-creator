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
import { AddButton, MenuWrapper, Image } from "./styled";

const SIZE: Array<{ img: string; name: string; size: number }> = [
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
    name: "1200-1400",
  },
  {
    img: "https://tilda.cc/zero/img/tn-razreshenie_5a.svg",
    size: 1400,
    name: "1400-1600",
  },
  {
    img: "https://tilda.cc/zero/img/tn-razreshenie_5a.svg",
    size: 1600,
    name: "1600",
  },
];

export function Header() {
  return (
    <MenuWrapper>
      <Flex w="25%" alignItems="center" justifyContent="space-between">
        LOGO
        <Flex alignItems="center" justifyContent="space-between">
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
                    colorScheme="teal"
                    variant="link"
                    justifyContent="start"
                  >
                    Text
                  </Button>
                  <Button
                    colorScheme="teal"
                    textAlign="left"
                    variant="link"
                    justifyContent="start"
                  >
                    Button
                  </Button>
                  <Button
                    colorScheme="teal"
                    textAlign="left"
                    variant="link"
                    justifyContent="start"
                  >
                    Image
                  </Button>
                  <Button
                    colorScheme="teal"
                    textAlign="left"
                    variant="link"
                    justifyContent="start"
                  >
                    Shape
                  </Button>
                  <Button
                    colorScheme="teal"
                    textAlign="left"
                    variant="link"
                    justifyContent="start"
                  >
                    Link
                  </Button>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      <Flex w="65%" justifyContent="center">
        {SIZE.map((i, idx) => (
          <Tooltip key={idx} label={i.name}>
            <Image imageActive={false} src={i.img} alt="mobile" />
          </Tooltip>
        ))}
      </Flex>

      <Flex w="10%">
        <Button background="white" size="sm" colorScheme="black" color="black">
          Create
        </Button>
      </Flex>
    </MenuWrapper>
  );
}
