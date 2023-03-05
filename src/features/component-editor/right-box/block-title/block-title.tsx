import { Text, Box } from '@chakra-ui/react'

export const BlockTitle = ({ children }: { children: string }) => {
  return (
    <Box height="40px" lineHeight="40px" padding="0 18px 0 20px">
      <Text opacity="0.4" textTransform="uppercase" fontSize="sm">
        {children}
      </Text>
    </Box>
  )
}
