import React from 'react';
import { 
  StyleSheet,
  View,
  Text, 
  Content, 
  H2,
  Card,
  Body,
  CardItem} from 'native-base';
import globalStyle from '../../styles/globalStyle';
 
export const About = () => {
  return (
      <Content>
      <Card> 
        <CardItem>
          <View> 
          <Text>
            Until 1979, harvesting of timber was carried out by allotting 
            working-coupes to contractors through open auctions. 
            This practice was found to be unsustainable as the 
            contractors operated the areas with the objective of 
            making the maximum profit and without paying any regard 
            to the scientific operation and management of forest.  {'\n\n'}

            In order to institutionalize the practice of scientific management of
            forest resources on sustainable basis, a Logging Division was
            established under the Forest Department in 1979 to harvest 
            timber departmentally after the logging operation programs
            were nationalized. {'\n\n'}     

            However, the departmental operation had a severe drawback 
            due to lack of financial autonomy as the Division had to 
            rely completely on government financing through the normal 
            annual budget; it’s earning being directly remitted to 
            the Ministry of Finance, as a result of which "plough-back 
            mechanism" could not be applied for the revenue earned. {'\n\n'}

            Therefore, to overcome the departmental operational deficiencies,
             the Logging Division was upgraded to a Corporation known as 
             Bhutan Logging Corporation (BLC) in 1984 under the Royal Charter 
             in order to carry out part of its mandate and, at the same time, 
             be able to:{'\n'}
             </Text>
           
            <Text style={globalStyle.innerMargin}>
            1. Plough back the generated funds for the all round development 
               of the Forest Management Units,{'\n'}
            2. Function along commercial line and bring about efficiency in operation,{'\n'}
            3. Create an organization of competent foresters and technicians, and{'\n'}
            4. In spite of its commercial nature, be sensitive and concerned about{'\n'}
               the environmental needs in the units. {'\n'}
            </Text>

            <Text>
            In 1996, BLC was upgraded to Forestry Development Corporation 
            Limited (FDCL) and entrusted with commercial mandates. 
            In November 2007, FDCL was restructured as Natural Resources 
            Development Corporation Limited (NRDCL) as per the Executive
            Order of the Prime Minister vide letter No PM/01/07/571 dated 
            7th November 2007 with mandate to manage sand, stone and other
            natural resources in addition to timber.NRDCL is owned by Druk 
            Holding and Investments (DHI), which is a 100% Government owned 
            Investment Company and is governed by the Articles of 
            Incorporation under the revised Companies Act of the 
            Kingdom of Bhutan 2000.
          </Text>
          </View>
        </CardItem>
      </Card> 
    </Content>
  );
}; 
export default About;
