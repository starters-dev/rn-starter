import React from 'react';
import {Alert, ScrollView} from 'react-native';
import {View, Button, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';

import {useServices} from '../services';
// import { useStores } from '../stores';
// import { useConstants } from '../utils/constants';

import {Section} from '../components/section';
import {randomNum} from '../utils/help';
import {Reanimated2} from '../components/reanimated2';

export const Example: React.FC<ExampleScreenProps> = observer(({value}) => {
  const {nav, t} = useServices();
  // const {} = useStores();
  // const {} = useConstants();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View padding-s4>
          <Section title={t.do('section.navigation.title')}>
            <View>
              <Button
                marginV-s1
                label={t.do('section.navigation.button.push')}
                // onPress={() => nav.push(componentId, 'Example')}
                onPress={() => Alert.alert('push')}
              />
              <Button
                marginV-s1
                label={t.do('section.navigation.button.show')}
                onPress={() => nav.show('Example')}
              />
              <Button
                marginV-s1
                label={t.do('section.navigation.button.passProps')}
                // onPress={() =>
                //   nav.push<ExampleScreenProps>(componentId, 'Example', {value: randomNum()})
                // }
                onPress={() => Alert.alert('pass props')}
              />
            </View>

            <Text textColor center text50R>
              Pass prop: {value}
            </Text>
          </Section>

          <Reanimated2 stID="reanimated2" />
          <Button
            marginV-s1
            label={t.do('section.navigation.button.back')}
            // onPress={() => nav.pop(componentId)}
            onPress={() => Alert.alert('go back')}
          />

          <Text textColor center>
            localized with i18n-js
          </Text>
        </View>
      </ScrollView>
    </View>
  );
});
