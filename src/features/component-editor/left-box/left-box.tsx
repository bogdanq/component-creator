import { Box, Text, Flex } from '@chakra-ui/react'
import { useStore } from 'effector-react'
import { combine } from 'effector'
import { EditIcon } from '@chakra-ui/icons'
import {
  $activeElement,
  $componentsTree,
  $layers,
  setActiveElement,
} from '../models'
import { BoxWrapper, BoxHeader } from './styled'

const $state = combine({
  activeElement: $activeElement,
  tree: $componentsTree,
  layers: $layers,
})

export const LeftSideBox = () => {
  const { tree, activeElement, layers } = useStore($state)

  if (!layers) {
    return null
  }

  return (
    <BoxWrapper className="setting-box">
      <BoxHeader>
        <Box pos="fixed" bg="#ebebeb" left="10px" w="150px">
          <Text opacity="0.4" textTransform="uppercase" fontSize="sm" pl="15px">
            Elements tree
          </Text>
        </Box>

        <Flex direction="column" pt="50px">
          {tree.elements.map((element) => (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              cursor="pointer"
              padding="15px 0"
              key={element.id}
              onClick={() => setActiveElement(element.id)}
            >
              <Box>
                <Text
                  fontSize="14px"
                  lineHeight="16px"
                  color="font.dark"
                  textTransform="capitalize"
                >
                  {element.type}
                </Text>
              </Box>

              {activeElement?.id === element.id && <EditIcon />}
            </Flex>
          ))}
        </Flex>
      </BoxHeader>
    </BoxWrapper>
  )
}
