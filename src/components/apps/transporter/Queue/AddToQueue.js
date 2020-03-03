import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';

import {
  Container,
  Content,
  Form,
  Grid,
  Row,
  Col,
  Text,
} from 'native-base';
import {
  handleError,
  getImages,
  setLoading,
} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';

export const AddToQueue = ({
  userState,
  commonState,
  navigation,
  setLoading,
}) => {
  //state info for forms
  const [all_common_pool_branch, set_all_common_pool_branch] = useState([]);
  const [common_pool_branch, set_common_pool_branch] = useState(undefined);
  const [Vehicle, setVehicle] = useState(undefined);

  const [vehicleDetail, setVehicleDetail] = useState(undefined);


  //For proper navigation/auth settings
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      getAllCommonPoolVehicle();
    }
  }, []);






  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <Content style={globalStyles.content}>
          <Form>
            <Row style={[globalStyles.tableContainer]}>
              <Grid>
                <Row style={globalStyles.tableHeaderContainer}>
                  <Col size={2} style={globalStyles.colContainer}>
                    <Text>Vehicle No</Text>
                  </Col>
                  <Col size={1.5} style={globalStyles.colContainer}>
                    <Text>Status</Text>
                  </Col>
                  <Col size={1.5} style={globalStyles.colContainer}>
                    <Text>Action</Text>
                  </Col>
                </Row>

                {commonPoolVehicle.map((vehicleDetail, idx) => (
                  <Row
                    key={idx}
                    style={globalStyles.rowContainer}>
                    <Col size={2} style={globalStyles.colContainer}>
                      <Text>{vehicleDetail.vehicle_no}</Text>
                    </Col>
                    <Col size={1.5} style={globalStyles.colContainer}>
                      <Text
                        style={{
                          color: 'blue',
                          textDecorationLine: 'underline',
                        }}>
                        {vehicleDetail.status}
                      </Text>
                    </Col>
                    <Col size={1.5} style={globalStyles.colContainer}>
                      <Text></Text>
                    </Col>
                  </Row>
                ))}
              </Grid>
            </Row>
          </Form>
        </Content>
      </Container>
    );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = {
  handleError,
  getImages,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToQueue);
