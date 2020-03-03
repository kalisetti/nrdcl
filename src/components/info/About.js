import React from 'react';
import {
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

export const About = () => {
  return (
    <Content>
        <CardItem>
            <Text>
            Natural Resources Development Corporation Ltd. was established in November 2007
            based on an executive order of the Royal Government of Bhutan, which was issued 
            in response to the Royal Command conveyed to the 87th session of the National 
            Assembly. However, its history dates back to 1979 when it was created as the 
            Logging Division of the Department of Forest, Ministry of Agriculture.  In 1984, 
            the Logging Division transitioned into a State-Owned Enterprise known as the 
            Bhutan Logging Corporation. BLC evolved into the Forestry Development Corporation 
            Limited (FDCL) in 1996 with the assignment of additional commercial mandates, 
            before settling into its present state as the NRDCL in 2007.{'\n\n'}

            NRDCL is a fully-owned Druk Holding and Investments (DHI) company. 
            The company is governed by the Articles of Incorporation under the Companies 
            Act of the Kingdom of Bhutan 2016. 
            </Text>
        </CardItem>
    </Content>
  );
};
export default About;
