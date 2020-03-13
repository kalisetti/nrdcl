import React, { Component } from 'react';
import { Container, Spinner, Text } from 'native-base';
import globalStyles from '../../styles/globalStyle';

export class SpinnerScreen extends Component {
  render() {
    return (
      <Container style={globalStyles.container}>
        <Spinner color="green" />
        <Text style={{ color: 'grey', textAlign: 'center' }}>Please Wait...</Text>
      </Container>
    );
  }
}

export default SpinnerScreen;
