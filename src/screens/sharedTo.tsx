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
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';
import {Bounceable} from '../components/bounceable';

type Props = NativeStackScreenProps<ScreenProps, 'SharedTo'>;

export const SharedTo: React.FC<Props> = observer(({route}) => {
  const {value} = route.params ?? {value: randomNum()};
  const {nav, t} = useServices();
  const navv = useNavigation(); // has to be useNavigation() as services.nav.n holds different NavigationContainer's state
  // const {} = useStores();
  // const {} = useConstants();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <Text textColor center text50R>
          Shared screen
        </Text> */}
        <View padding-s4 style={{marginTop: 1}}>
          <Section title="Transition">
            {/* <Reanimated2 stID="reanimated2" /> */}

            <View marginV-s2>
              <Bounceable onPress={navv.goBack}>
                <SharedElement id={'image'}>
                  <Image
                    source={{
                      uri: 'https://www.thesprucepets.com/thmb/BKNJkoyr-qyvfaYVRVCuEHNmOXU=/1155x1155/smart/filters:no_upscale()/Stocksy_txp14acff329Kw100_Medium_1360769-5aec7baefa6bcc00373c6cb7.jpg',
                    }}
                    style={{height: 300, width: 300, borderRadius: 20}}
                  />
                </SharedElement>
              </Bounceable>
            </View>

            {/* <View>
              <Button
                marginV-s1
                label="Start transition"
                onPress={() => nav.push('Example', {value: randomNum()})}
              />
            </View> */}
          </Section>

          <Button marginV-s1 label={t.do('section.navigation.button.back')} onPress={navv.goBack} />

          <Section title={t.do('section.navigation.title')}>
            <Button
              marginV-s1
              label={t.do('section.navigation.button.push')}
              onPress={() => nav.push('Example', {value: randomNum()})}
            />
            <Button
              marginV-s1
              label={t.do('section.navigation.button.show')}
              onPress={() => nav.show('ExampleModal')}
            />
            <Button
              marginV-s1
              label={t.do('section.navigation.button.sharedTransition')}
              // onPress={() => Alert.alert('future feature: shared transition')}
              onPress={() => nav.push('ExampleShared')}
            />
          </Section>

          {/* <Text textColor center>
            localized with i18n-js
          </Text> */}
        </View>
      </ScrollView>
    </View>
  );
});
