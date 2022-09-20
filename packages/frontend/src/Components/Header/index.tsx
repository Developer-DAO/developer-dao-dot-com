import {
  Box,
  Divider,
  Flex,
  HStack,
  AbsoluteCenter,
  Image,
  Link,
  Stack,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { ArrowForwardIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import React, { ReactNode, useState } from 'react';

const NavLinks = [
  {
    text: 'Blog',
    href: 'https://blog.developerdao.com/',
  },
  {
    text: 'Academy',
    href: 'https://academy.developerdao.com',
  },
  {
    text: 'Twitter',
    href: 'https://twitter.com/developer_dao',
  },
  {
    text: 'Newsletter',
    href: 'https://developerdao.substack.com/',
  },
  {
    text: 'Forum',
    href: 'https://forum.developerdao.com/',
  },
  {
    text: 'Jobs',
    href: 'https://developerdao.pallet.com/jobs',
  },
];

const SwitchWithIcons = ({ display }: { display: any }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box display={display} width={'min-content'} position="relative">
      <Switch
        size={'lg'}
        padding={{ base: '16px 0', md: 0, sm: '16px 0' }}
        onChange={toggleColorMode}
        colorScheme="gray"
        isChecked={colorMode === 'light'}
      />
      <AbsoluteCenter
        style={{
          pointerEvents: 'none',
        }}
        width="100%"
      >
        <Flex alignItems="center" justifyContent="space-evenly">
          <MoonIcon
            w={3.5}
            h={3.5}
            color={colorMode === 'dark' ? 'black' : 'white'}
          />
          <SunIcon
            w={3.5}
            h={3.5}
            color={colorMode === 'dark' ? 'white' : 'black'}
            fill="currentcolor"
          />
        </Flex>
      </AbsoluteCenter>
    </Box>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex={1}
        width="100%"
      >
        <Box>
          <Link
            href="/"
            display="flex"
            alignItems="center"
            textDecoration="none"
          >
            <Image
              w="4rem"
              h="4rem"
              src={`/D_D_logo-${colorMode === 'dark' ? 'dark' : 'light'}.svg`}
              alt="logo"
            />
            <Text
              textDecoration="none"
              ml={'1.25rem'}
              mr={{ base: '1rem', sm: '3rem' }}
              fontWeight="bold"
              color={colorMode === 'dark' ? '#FFFFFF' : '#000000'}
              display={{ base: 'block', md: 'none', lg: 'block' }}
            >
              Developer DAO
            </Text>
          </Link>
        </Box>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
      </Flex>
      <HStack
        spacing={{ base: 4, xl: 10 }}
        display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
        height={{ base: isOpen ? 'calc(100vh - 196px)' : '' }}
        zIndex={{ base: '999999' }}
        flexShrink={1}
        width={{ base: '100%', md: 'auto' }}
      >
        <MenuLinks isOpen={isOpen} />
        <SwitchWithIcons display={{ base: 'none', md: 'block' }} />
      </HStack>
    </NavBarContainer>
  );
};

const CloseIcon = () => {
  const { colorMode } = useColorMode();
  return (
    <svg
      width="32px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      stroke="white"
    >
      <title>Close</title>
      <path
        fill={colorMode === 'dark' ? 'white' : 'black'}
        d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
      />
    </svg>
  );
};

const MenuIcon = () => {
  const { colorMode } = useColorMode();
  return (
    <svg
      width="24px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill={colorMode === 'dark' ? 'white' : 'black'}
      stroke="white"
    >
      <title>Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0" />
    </svg>
  );
};

const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => {
  return (
    <Box
      display={{ base: 'auto', md: 'none' }}
      onClick={toggle}
      cursor="pointer"
      justifyContent={'flex-end'}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({
  children,
  to = '/',
  key,
  ...rest
}: {
  children: ReactNode;
  to: string;
  key?: number;
  style: object;
}) => {
  return (
    <Link
      target="_blank"
      href={to}
      width="full"
      display={{ base: 'flex' }}
      justifyContent={{ base: 'space-between' }}
      alignItems="center"
    >
      <Text display="block" fontSize={{ base: '29px', md: '20px' }} {...rest}>
        {children}
      </Text>
      <ArrowForwardIcon w={8} h={8} display={{ md: 'none' }} />
    </Link>
  );
};

const MenuLinks = ({ isOpen }: { isOpen: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      display={{ base: isOpen ? 'flex' : 'none', md: 'block' }}
      width="full"
      height="full"
    >
      <Stack
        spacing={['16px', '16px', null, '24px', '44px']}
        justify={{ base: 'flex-start', md: 'flex-end' }}
        direction={{ base: 'column', md: 'row' }}
        marginTop={{ base: '1rem', md: '0' }}
        width="full"
        pt={[8, 4, 0, 0]}
      >
        {NavLinks.map((item, index) => (
          <MenuItem
            to={item.href}
            key={index}
            style={{
              marginBottom: {
                base: NavLinks.length - 1 === index ? '1.5rem' : '0',
                md: '0',
              },
            }}
          >
            {item.text}
          </MenuItem>
        ))}
        <Divider
          display={{ md: 'none' }}
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
        />
        <Link
          target="_blank"
          href="https://airtable.com/shrYLrOrjhOHJUdVl"
          width="full"
          display={{ base: 'flex', md: 'none' }}
          justifyContent={{ base: 'space-between' }}
          alignItems="center"
        >
          <Text display="block" fontSize={{ base: '20px' }}>
            Become a Partner
          </Text>
          <ArrowForwardIcon
            w={8}
            h={8}
            style={{ strokeWidth: '1px' }}
            display={{ md: 'none' }}
          />
        </Link>
        <Divider
          display={{ md: 'none' }}
          marginTop="100px"
          borderColor={colorMode === 'dark' ? 'white' : 'black'}
        />
        <SwitchWithIcons display={{ base: 'block', md: 'none' }} />
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      flexDir={{ base: 'column', md: 'row' }}
      wrap="wrap"
      w="100%"
      mb={8}
      py={1}
      px={{ base: 0, lg: 3 }}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
