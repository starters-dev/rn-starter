import React from 'react';
import {Alert, Image, ScrollView} from 'react-native';
import {View, Button, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScreenProps} from '.';
import {useServices} from '../services';
// import { useStores } from '../stores';
// import { useConstants } from '../utils/constants';

import {Section} from '../components/section';
import {randomNum} from '../utils/help';
import {Reanimated2} from '../components/reanimated2';
import {useNavigation} from '@react-navigation/core';
import {SharedElement} from 'react-navigation-shared-element';
import {Bounceable} from '../components/bounceable';

type Props = NativeStackScreenProps<ScreenProps, 'Shared'>;

export const Shared: React.FC<Props> = observer(({route}) => {
  const {value} = route.params ?? {value: randomNum()};
  const {nav, t} = useServices();
  const navv = useNavigation();
  // const {} = useStores();
  // const {} = useConstants();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <Text textColor center text50R>
          Shared screen
        </Text> */}
        <View padding-s4>
          <Section title="Transition">
            {/* <Reanimated2 stID="reanimated2" /> */}

            <View marginV-s2>
              <Bounceable onPress={() => navv.push('SharedTo')}>
                <SharedElement id={'image'}>
                  <Image
                    source={{
                      uri: 'https://www.thesprucepets.com/thmb/BKNJkoyr-qyvfaYVRVCuEHNmOXU=/1155x1155/smart/filters:no_upscale()/Stocksy_txp14acff329Kw100_Medium_1360769-5aec7baefa6bcc00373c6cb7.jpg',
                    }}
                    style={{height: 120, width: 120, borderRadius: 120}}
                  />
                </SharedElement>
              </Bounceable>
            </View>

            <View marginT-s8>
              {/* <Button marginV-s1 label="Start transition" onPress={() => nav.push('SharedTo')} /> */}
              <Button marginV-s1 label="Start transition" onPress={() => navv.push('SharedTo')} />
            </View>
          </Section>

          {/* <Button marginV-s1 label={t.do('section.navigation.button.back')} onPress={navv.goBack} /> */}

          {/* <Text textColor center>
            localized with i18n-js
          </Text> */}
        </View>
      </ScrollView>
    </View>
  );
});
