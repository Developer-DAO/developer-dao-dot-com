import {
  chakra,
  Flex,
  HStack,
  Image,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex alignItems={'center'} justify="space-between" w={'full'}>
      <Flex alignItems="center">
        <Image
          width="4rem"
          h="4rem"
          src={`/D_D_logo-${colorMode === 'dark' ? 'dark' : 'light'}.svg`}
          alt="logo"
        />
        <Text
          ml={'1.25rem'}
          fontWeight="bold"
          variant="medium"
          color={colorMode === 'dark' ? '#FFFFFF' : '#000000'}
        >
          Developer DAO
        </Text>
      </Flex>
      <Switch onChange={toggleColorMode} colorScheme="blackAlpha" />
    </Flex>
  );
};

export default Header;
