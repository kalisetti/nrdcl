import React, {Component} from 'react';
import {Container, Spinner} from 'native-base';
import globalStyles from '../../styles/globalStyle';

export class SpinnerScreen extends Component {
  render() {
    return (
      <Container style={globalStyles.container}>
        <Spinner color="green" />
      </Container>
    );
  }
}

export default SpinnerScreen;
