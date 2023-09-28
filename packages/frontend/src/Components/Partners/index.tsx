import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import { useCallback } from 'react';

import { Media, Partner, StrapiMultipleData } from '../../types';
import { NEXT_PUBLIC_CMS_URL } from '../../utils';

interface PartnersProps {
  data: StrapiMultipleData<Partner>;
}

const Partners = ({ data: partners }: PartnersProps) => {
  const { colorMode } = useColorMode();
  const handleButtonClick = useCallback(() => {
    const partnerFormUrl = 'https://devdao.to/partner-with-us';
    window.open(partnerFormUrl, '_blank');
  }, []);

  const getLogo = useCallback(
    (partner: Partner) =>
      colorMode === 'dark'
        ? partner.logo_dark.data?.attributes
        : partner.logo_light.data?.attributes,
    [colorMode],
  );

  const getLogoSrc = useCallback(
    (logo?: Media) =>
      logo?.provider === 'local'
        ? `${NEXT_PUBLIC_CMS_URL}${logo?.url}`
        : logo?.url,
    [],
  );

  return (
    <Flex flexDir="column" justifyContent="center" pt="5.5rem" pb="5.5rem">
      <Heading
        textTransform={'capitalize'}
        fontFamily="Inter"
        fontWeight="800"
        fontSize="3.375rem"
        mb={{ base: '5rem', xl: '6.175rem' }}
        textAlign="center"
      >
        Our Partners
      </Heading>
      <Flex flexDir={{ base: 'column', xl: 'row' }} alignItems={'center'}>
        {partners?.data ? (
          partners.data.map((partnerEntity) => {
            return (
              <Link
                href={partnerEntity.attributes.website}
                key={partnerEntity.id}
                mb={{ base: '4rem', xl: '0' }}
                mx={{ base: '0', xl: '3rem' }}
                target="_blank"
                maxW={'300px'}
              >
                <img
                  loading="lazy"
                  src={getLogoSrc(getLogo(partnerEntity.attributes))}
                  alt={partnerEntity.attributes.name || 'partner image'}
                />
              </Link>
            );
          })
        ) : (
          <></>
        )}
      </Flex>
      <Button
        backgroundColor={colorMode === 'dark' ? 'white' : 'black'}
        color={colorMode === 'dark' ? 'black' : 'white'}
        fontFamily="Inter"
        fontWeight="500"
        fontSize={{ base: '1rem', xl: '1.25rem' }}
        borderRadius="56px"
        px="2rem"
        py="2rem"
        mt={{ base: '5rem', xl: '6.85rem' }}
        alignSelf="center"
        onClick={handleButtonClick}
      >
        Become a partner <ArrowForwardIcon w="1.5rem" h={'22px'} ml="8px" />
      </Button>
    </Flex>
  );
};

export default Partners;
