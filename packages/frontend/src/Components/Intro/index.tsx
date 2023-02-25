import { FC } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/future/image';
import { useTranslation } from 'next-i18next';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { FaDiscord } from 'react-icons/fa';
import { HomePage } from '../../types';

import mainImg from '../../../public/main.png';

type IntroProps = {
  heading: HomePage['heading'];
  subHeading: HomePage['sub_heading'];
  currentStatus: HomePage['current_status'];
};

const Intro: FC<IntroProps> = ({ heading, subHeading }) => {
  const { t } = useTranslation();

  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      pt={{ base: '0', lg: '4.5rem' }}
      pb="5rem"
      w="100%"
    >
      <Box
        w={{ base: '100%', xl: '40%' }}
        minW={{ base: '0', xl: '34rem' }}
        maxW={{ xl: '34rem' }}
        margin={{ lg: '0.75rem' }}
        p={{ base: '1rem', md: '2rem' }}
      >
        <Box>
          <Text
            fontFamily="Inter"
            fontWeight="800"
            // mr="2rem"
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
          <Flex justifyContent="start" w="100" mt="3rem">
            {/* <Button
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
              onClick={() => {
                window.open('https://claim.developerdao.com', '_blank');
              }}
            >
              Claim $CODE
            </Button> */}

            <Button
              px="1.5rem"
              border="1px solid white"
              borderRadius="0.625rem"
              maxW={{ base: '75%', md: '20rem' }}
              bg="white"
              color="black"
              flexGrow={1}
              py={{ base: '1.75rem', xl: '2rem' }}
              // ml={{ base: '0', xl: '2rem' }}
              fontSize={{ base: '0.875rem', xl: '1.25rem' }}
              _hover={{
                bg: 'black',
                color: 'white',
              }}
              onClick={() => {
                window.open('https://www.guild.xyz/dd', '_blank');
              }}
            >
              <Box as={FaDiscord} mr=".75rem" fontSize="2rem" />
              <Box>
                <Text>Join Discord</Text>
                <Text fontSize="0.75rem">(via Guild.xyz)</Text>
              </Box>
            </Button>
          </Flex>
        </Box>
      </Box>

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
