import React from 'react';
import {
  Container,
  StyleSheet,
  View,
  Text,
  Content,
  H2,
  Card,
  Body,
  CardItem
} from 'native-base';
import globalStyle from '../../styles/globalStyle';

export const Help = () => {
  return (
    <Content>
      <CardItem>
        <View>
          <Text>
            User Instruction
          </Text>
        </View>
      </CardItem>
    </Content>
  );
};

export default Help;
