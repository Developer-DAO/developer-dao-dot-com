import { chakra, HStack, Text, useColorMode } from '@chakra-ui/react';

const Header = () => {
  const { colorMode } = useColorMode();
  return (
    <HStack>
      <Text
        variant="medium"
        color={colorMode === 'dark' ? '#FFFFFF' : '#000000'}
      >
        dsdsjksj
      </Text>
    </HStack>
  );
};

export default Header;
