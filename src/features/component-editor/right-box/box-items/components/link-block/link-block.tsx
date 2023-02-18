import { Text, Flex, Input, Tooltip, Select } from '@chakra-ui/react'
import { handleChangeMetaDataLink, ElementLink } from '../../../../models'
import { PanelItem } from './styled'

export const LinkBlock = ({
  activeElement,
}: {
  activeElement: ElementLink
}) => {
  return (
    <>
      <PanelItem>
        <Flex direction="column">
          <Tooltip label="link to external source" placement="left">
            <Flex justifyContent="space-between">
              <Text fontSize="sm" opacity="0.5">
                Href
              </Text>
              <Input
                placeholder="source link"
                size="xs"
                w="62%"
                background="transparent"
                value={activeElement.meta.href}
                onChange={(e) =>
                  handleChangeMetaDataLink({
                    id: activeElement.id,
                    value: e.target.value,
                    metaName: 'href',
                  })
                }
              />
            </Flex>
          </Tooltip>

          <Tooltip label="way to follow the link" placement="left">
            <Flex mt="25px" justifyContent="space-between">
              <Text fontSize="sm" opacity="0.5">
                Target
              </Text>

              <Select
                background="transparent"
                placeholder="select target"
                size="xs"
                w="62%"
                defaultValue="_self"
                value={activeElement.meta.target}
                onChange={(e) =>
                  handleChangeMetaDataLink({
                    id: activeElement.id,
                    value: e.target.value,
                    metaName: 'target',
                  })
                }
              >
                <option value="_blank">Open new page</option>
                <option value="">Open in this page</option>
              </Select>
            </Flex>
          </Tooltip>
        </Flex>
      </PanelItem>
    </>
  )
}
