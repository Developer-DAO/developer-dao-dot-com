import { FC } from 'react';
import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import Image from 'next/future/image';
import { useTranslation } from 'next-i18next';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { HomePage } from '../../types';

const codeLaunched = false;

import mainImg from '../../../public/main.png';

type IntroProps = {
  heading: HomePage['heading'];
  subHeading: HomePage['sub_heading'];
  currentStatus: HomePage['current_status'];
};

const Intro: FC<IntroProps> = ({ heading, subHeading, currentStatus }) => {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      pt={{ base: '0', lg: '4.5rem' }}
      pb="5rem"
      w="100%"
    >
      {!codeLaunched && (
        <Box
          w={{ base: '100%', xl: '40%' }}
          minW={{ base: '0', xl: '34rem' }}
          margin={{ lg: '0.75rem' }}
          border="1px solid"
          borderRadius="11px"
          p="2rem"
        >
          <Box pr="4rem">
            <Text
              fontFamily="Inter"
              fontWeight="800"
              mr="2rem"
              fontSize={{ base: '2.625rem', xl: '3.375rem' }}
              lineHeight={{ base: '2.625rem', xl: '4rem' }}
            >
              {t(heading!)}
            </Text>
            <Text
              fontFamily="Inter"
              fontWeight="500"
              mt="2rem"
              lineHeight="1.5"
              fontSize={{ base: '1.25rem', xl: '1.5rem' }}
            >
              {t(subHeading!)}
            </Text>
          </Box>
          <Box
            border="1px solid"
            borderRadius="0.75rem"
            bg="white"
            py="1.25rem"
            px="1.5rem"
            mt="2rem"
          >
            <Text
              fontFamily="Inter"
              fontWeight="700"
              color="black"
              fontSize={{ base: '1rem', xl: '1.5rem' }}
            >
              {t(currentStatus?.statement.title!)}
            </Text>
            <Text
              fontFamily="Inter"
              fontWeight="500"
              color="black"
              mt="1rem"
              fontSize={{ base: '0.8rem', xl: '1.25rem' }}
              lineHeight={{ base: '1.125rem', xl: '1.75rem' }}
            >
              {t(currentStatus?.statement.description!)}
            </Text>
            <Button
              mt="1rem"
              pl="1rem"
              border="1px solid black"
              fontWeight="bold"
              color={colorMode === 'dark' ? 'black' : 'white  '}
              backgroundColor={colorMode === 'dark' ? 'white' : 'black'}
              pr={{ base: '1rem', xl: '1.2rem' }}
              py={{ base: '1rem', xl: '1.5rem' }}
              borderRadius={{ base: '.438rem', xl: '0.688rem' }}
              fontSize={{ base: '0.75rem', xl: '1.25rem' }}
              onClick={() => {
                window.open(currentStatus?.link.link, '_blank');
              }}
            >
              <Box as={BsFillLightningChargeFill} mr=".5rem" color="#FFD666" />
              {t(currentStatus?.link.title!)}
            </Button>
          </Box>
        </Box>
      )}

      {/* todo: create match Strapi's "current_status" block when $CODE launches: statement{} and link{} */}
      {codeLaunched && (
        <Box
          w={{ base: '100%', xl: '40%' }}
          minW={{ base: '0', xl: '35rem' }}
          margin="0.85rem"
        >
          <Text
            fontFamily="Inter"
            fontWeight="800"
            fontSize={{ base: '3.3rem', lg: '4rem', xl: '5.375rem' }}
            lineHeight={{ base: '4.375rem', xl: '6.5rem' }}
          >
            {t(heading!)}
          </Text>
          <Text
            fontFamily="Inter"
            fontWeight="500"
            mt="2.5rem"
            lineHeight="1.5"
            fontSize={{ base: '1.25rem', xl: '1.5rem' }}
          >
            {t(subHeading!)}
          </Text>

          <Flex justifyContent="center" w="100" mt="3rem">
            <Button
              px="1.5rem"
              border="1px solid black"
              borderRadius="0.625rem"
              bg="white"
              color="black"
              flexGrow={1}
              fontSize={{ base: '0.875rem', xl: '1.25rem' }}
              py={{ base: '1.75rem', xl: '2rem' }}
              _hover={{
                bg: 'black',
                color: 'white',
              }}
            >
              Claim $CODE
            </Button>

            <Button
              px="1.5rem"
              border="1px solid white"
              borderRadius="0.625rem"
              bg="black"
              color="white"
              flexGrow={1}
              py={{ base: '1.75rem', xl: '2rem' }}
              ml={{ base: '1.25rem', xl: '2rem' }}
              fontSize={{ base: '0.875rem', xl: '1.25rem' }}
              _hover={{
                bg: 'white',
                color: 'black',
                borderColor: 'black',
              }}
            >
              <Box as={FaDiscord} mr=".75rem" fontSize="2rem" />
              Join Discord
            </Button>
          </Flex>
        </Box>
      )}
      {/*todo: Create Strapi Component that would show Curated Contributors - */}
      <Flex
        direction="column"
        maxWidth={{ base: 'none', xl: '45%', '2xl': 'none' }}
        mr={{ base: 'auto', xl: '.75rem' }}
        ml={{ base: 'auto', lg: '2rem' }}
        mt={{ base: '5rem', lg: 0 }}
        mb={{ base: '2rem', xl: 0 }}
        transform={{ base: 'translateY(0)', xl: 'translateY(-40px)' }}
      >
        <Image src={mainImg} alt="main" loading="eager" />
      </Flex>
    </Flex>
  );
};

export default Intro;
