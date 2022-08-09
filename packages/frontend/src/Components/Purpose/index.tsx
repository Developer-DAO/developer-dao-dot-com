import { FC } from 'react';
import {
  Box,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  ListItem,
  OrderedList,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BsArrowUpRight } from 'react-icons/bs';
import { DEVELOPER_DAO_WIKI } from '../../utils';
import { HomePage } from '../../types';

type PurposeProps = Pick<HomePage, 'values' | 'mission' | 'goals'>;

const Purpose: FC<PurposeProps> = ({ values, mission, goals }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { t } = useTranslation();
  const valuesListStyle = {
    counterReset: 'values',
    marginLeft: '2.3rem',
    'li::marker': {
      content: 'counter(values) "   "',
    },
    li: {
      counterIncrement: 'values',
      margin: '2rem 0',
    },
  };
  const goalsListStyle = {
    counterReset: 'goals',
    marginLeft: '2.3rem',
    'li::marker': {
      content: 'counter(goals) " - "',
    },
    li: {
      counterIncrement: 'goals',
      margin: '1rem 0',
    },
  };

  const getValuesItem = (title: string, body: string) => {
    return (
      <Box flexDir="column">
        <Text
          variant={isMobile ? 'normal' : 'large'}
          fontWeight="bold"
          mb="1rem"
        >
          {t(title)}
        </Text>
        <Text variant={isMobile ? 'normalMobile' : 'normal'}>{t(body)}</Text>
      </Box>
    );
  };

  return (
    <Flex justify="center" wrap="wrap-reverse">
      <Box className="box-border" flex="3" minW={isMobile ? '100%' : '20rem'}>
        <Heading variant={isMobile ? 'mediumMobile' : 'medium'}>
          {t('values.title')}
        </Heading>
        <OrderedList sx={valuesListStyle}>
          {values?.map((value) => (
            <ListItem key={value.id}>
              {getValuesItem(value.title, value.description)}
            </ListItem>
          ))}
        </OrderedList>
      </Box>
      <Flex
        className="box-border"
        flex="2"
        justifyContent="space-between"
        alignItems="center"
        flexDir="column"
        minW={isMobile ? '100%' : '20rem'}
      >
        <Box>
          <Box mb="4.4rem">
            <Text
              variant="normal"
              fontSize={isMobile ? 'md' : 'lg'}
              fontWeight="bold"
              mb="0.9rem"
            >
              {t('mission.title')}
            </Text>
            <Text variant={isMobile ? 'normalMobile' : 'normal'}>
              {t(mission!)}
            </Text>
          </Box>
          <Box mb="3.4rem">
            <Text variant="large" fontWeight="bold" mb="1rem">
              {t('goals.title')}
            </Text>
            <OrderedList sx={goalsListStyle}>
              {goals?.map((goal) => (
                <ListItem key={goal.id}>
                  <Text variant={isMobile ? 'normalMobile' : 'normal'}>
                    {t(goal.description)}
                  </Text>
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        </Box>
        <LinkBox
          as="article"
          rounded="10"
          border="1px solid black"
          backgroundColor={useColorModeValue('black', 'white')}
          width="100%"
          maxWidth="30rem"
          height="18rem"
          padding="1rem"
        >
          {/*todo: check if need to add to CMS*/}
          <LinkOverlay href={DEVELOPER_DAO_WIKI} target="_blank">
            <Icon
              as={BsArrowUpRight}
              position="absolute"
              right="1rem"
              color={useColorModeValue('white', 'black')}
            />
            <Box position="absolute" bottom="0.2rem" padding="1rem 0.5rem">
              <Text variant="large" color={useColorModeValue('white', 'black')}>
                {t('callToAction.wiki.title')}
              </Text>
              <Text
                variant="normal"
                fontSize="xs"
                color={useColorModeValue('white', 'black')}
              >
                {t('callToAction.wiki.body')}
              </Text>
            </Box>
          </LinkOverlay>
        </LinkBox>
      </Flex>
    </Flex>
  );
};
export default Purpose;
