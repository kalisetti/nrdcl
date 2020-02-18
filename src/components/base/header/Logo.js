import React, {Component} from 'react';
import {Image} from 'react-native';

export class Logo extends Component {
  render() {
    return (
      <Image
        source={require('../../../assets/images/nrdcl_logo.png')}
        style={{
          alignSelf: 'center',
          width: 150,
          height: 174,
          marginBottom: 20,
        }}
      />
    );
  }
}
export default Logo;
