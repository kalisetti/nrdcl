import React from 'react';
import {Container,
  StyleSheet,
  View,
  Text, 
  Content, 
  H2,
  Card,
  Body,
  CardItem} from 'native-base';
import globalStyle from '../../styles/globalStyle';

export const Some = () => {
  return (
    <Content> 
      <CardItem>
        <View> 
          <Text>1. What is the vision of NRDCL?</Text> 
          <Text>Ans: To be the premier institution in providing
             reliable and quality natural resource products and 
             services to support nation building.
          </Text> 
        </View>
      </CardItem> 
  </Content>
);
};

export default Some;
