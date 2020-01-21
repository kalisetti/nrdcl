import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-native';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  Container,
  Text,
  Grid,
  Row,
  Col,
  Button,
  Icon,
  Content,
  View,
} from 'native-base';
import SpinnerScreen from '../../../base/SpinnerScreen';
import globalStyle from '../../../../styles/globalStyle';
import {
  setLoading,
  callAxios,
  handleError,
} from '../../../../redux/actions/commonActions';
import {startSetSiteStatus} from '../../../../redux/actions/siteActions';

export const SiteDetail = ({
  userState,
  commonState,
  navigation,
  startSetSiteStatus,
  handleError,
}) => {
  const [site, setSite] = useState({items: []});
  const [currentItem, setcurrentItem] = useState({});
  const [modalIsVisible, setVisible] = useState(false);
  const [showEnableAlert, setShowEnableAlert] = useState(false);
  const [showDisableAlert, setShowDisableAlert] = useState(false);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getSiteDetail(navigation.state.params.id);
    }
  }, []);

  const getSiteDetail = async id => {
    try {
      const response = await callAxios(`resource/Site/${id}`);
      setSite(response.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const closeModal = () => {
    setcurrentItem({});
    setVisible(false);
  };

  const openModal = item => {
    setcurrentItem(item);
    setVisible(true);
  };

  const extendSiteQty = () => {
    navigation.navigate('ExtendQty', {
      id: site.name,
      current_item: currentItem,
    });
    closeModal();
  };

  const toggleDisableAlert = () => {
    setShowDisableAlert(!showDisableAlert);
  };

  const toggleEnableAlert = () => {
    setShowEnableAlert(!showEnableAlert);
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container>
      {showDisableAlert && (
        <View style={{width: '100%', height: '100%'}}>
          <AwesomeAlert
            show={showDisableAlert}
            showProgress={false}
            title="Disable Site"
            message="Are you sure you want to disable site"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, disable it"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              toggleDisableAlert();
            }}
            onConfirmPressed={() => {
              toggleDisableAlert();
              startSetSiteStatus({
                site: site.name,
                status: 0,
              });
            }}
          />
        </View>
      )}

      {showEnableAlert && (
        <View style={{width: '100%', height: '100%'}}>
          <AwesomeAlert
            show={showEnableAlert}
            showProgress={false}
            title="Enable Site"
            message="Are you sure you want to enable site"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, enable it"
            confirmButtonColor="#12793e"
            onCancelPressed={() => {
              toggleEnableAlert();
            }}
            onConfirmPressed={() => {
              toggleEnableAlert();
              startSetSiteStatus({
                site: site.name,
                status: 1,
              });
            }}
          />
        </View>
      )}
      <Grid style={{marginTop: 5}}>
        <Row
          style={{
            height: 55,
            borderBottomWidth: 1,
            borderBottomColor: 'green',
          }}>
          {site.enabled ? (
            <Col>
              <Button
                vertical
                transparent
                style={{alignSelf: 'center'}}
                onPress={() =>
                  navigation.navigate('ExtendSite', {
                    id: site.name,
                    start_date: site.construction_start_date,
                    end_date: site.construction_end_date,
                  })
                }>
                <Icon
                  name="format-text-wrapping-overflow"
                  type="MaterialCommunityIcons"
                  style={{color: 'blue'}}
                />
                <Text style={{color: 'blue'}}>Extend Date</Text>
              </Button>
            </Col>
          ) : (
            <Text></Text>
          )}
          {site.enabled ? (
            <Col>
              <Button
                vertical
                transparent
                style={{alignSelf: 'center'}}
                onPress={() => toggleDisableAlert()}>
                <Icon
                  name="closesquareo"
                  type="AntDesign"
                  style={{color: 'red'}}
                />
                <Text style={{color: 'red'}}>Disable Site</Text>
              </Button>
            </Col>
          ) : (
            <Col>
              <Button
                vertical
                transparent
                style={{alignSelf: 'center'}}
                onPress={() => toggleEnableAlert()}>
                <Icon
                  name="checksquareo"
                  type="AntDesign"
                  style={{color: 'blue'}}
                />
                <Text style={{color: 'blue'}}>Enable Site</Text>
              </Button>
            </Col>
          )}
        </Row>

        <Content style={globalStyle.content}>
          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Site Status</Text>
            </Col>
            <Col size={3}>
              {site.enabled ? (
                <Text style={{color: 'blue', fontWeight: 'bold'}}>Active</Text>
              ) : (
                <Text style={{color: 'red', fontWeight: 'bold'}}>Inactive</Text>
              )}
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Site ID</Text>
            </Col>
            <Col size={3}>
              <Text>{site.name}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Site Type</Text>
            </Col>
            <Col size={3}>
              <Text>{site.site_type}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Purpose</Text>
            </Col>
            <Col size={3}>
              <Text>{site.purpose}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Construction Type</Text>
            </Col>
            <Col size={3}>
              <Text>{site.construction_type}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Start Date</Text>
            </Col>
            <Col size={3}>
              <Text>
                {moment(site.construction_start_date)
                  .format('Do MMM YYYY')
                  .toString()}
              </Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>End Date</Text>
            </Col>
            <Col size={3}>
              <Text>
                {moment(site.extension_till_date)
                  .format('Do MMM YYYY')
                  .toString()}
              </Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Number of Floors</Text>
            </Col>
            <Col size={3}>
              <Text>{site.number_of_floors}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Approval No.</Text>
            </Col>
            <Col size={3}>
              <Text>{site.approval_no}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Dzongkhag</Text>
            </Col>
            <Col size={3}>
              <Text>{site.dzongkhag}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Plot/Thram No.</Text>
            </Col>
            <Col size={3}>
              <Text>{site.plot_no}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Location</Text>
            </Col>
            <Col size={3}>
              <Text>{site.location}</Text>
            </Col>
          </Row>

          <Row style={globalStyle.labelContainer}>
            <Col size={2}>
              <Text style={globalStyle.label}>Remarks</Text>
            </Col>
            <Col size={3}>
              <Text>{site.remarks}</Text>
            </Col>
          </Row>

          <Row style={[globalStyle.labelContainer]}>
            <Text style={globalStyle.label}>EXPECTED MATERIAL DETAILS</Text>
          </Row>
          <Row style={[globalStyle.tableContainer, globalStyle.mb50]}>
            <Grid>
              <Row style={globalStyle.tableHeaderContainer}>
                <Col size={2} style={globalStyle.colContainer}>
                  <Text>From</Text>
                </Col>
                <Col size={1.5} style={globalStyle.colContainer}>
                  <Text>Material</Text>
                </Col>
                <Col size={1}>
                  <Text>Quantity</Text>
                </Col>
                <Col size={0.6}></Col>
              </Row>
              {site.items.map((item, idx) => (
                <Row key={idx} style={globalStyle.rowContainer}>
                  <Col size={2} style={globalStyle.colContainer}>
                    <Text>{item.branch}</Text>
                  </Col>
                  <Col size={1.5} style={globalStyle.colContainer}>
                    <Text>{item.item_sub_group}</Text>
                  </Col>
                  <Col size={1}>
                    <Text>
                      {item.overall_expected_quantity} {item.uom}
                    </Text>
                  </Col>
                  <Col size={0.6}>
                    <Button
                      vertical
                      transparent
                      onPress={() => openModal(item)}
                      style={{
                        width: 40,
                      }}>
                      <Icon name="md-more" />
                    </Button>
                  </Col>
                </Row>
              ))}
            </Grid>
          </Row>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalIsVisible}
            onRequestClose={() => closeModal()}>
            <Container style={globalStyle.modal}>
              <Grid style={{marginTop: 5}}>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>Material</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.item_sub_group}</Text>
                  </Col>
                </Row>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>UoM</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.uom}</Text>
                  </Col>
                </Row>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>Initial Qty</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.expected_quantity}</Text>
                  </Col>
                </Row>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>Additional Qty</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.extended_quantity}</Text>
                  </Col>
                </Row>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>Total Qty</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.overall_expected_quantity}</Text>
                  </Col>
                </Row>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>Material Source</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.branch}</Text>
                  </Col>
                </Row>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>Transport Mode</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.transport_mode}</Text>
                  </Col>
                </Row>
                <Row style={globalStyle.labelContainer}>
                  <Col size={2}>
                    <Text style={globalStyle.label}>Remarks</Text>
                  </Col>
                  <Col size={3}>
                    <Text>{currentItem.remarks}</Text>
                  </Col>
                </Row>
                {site.enabled ? (
                  <Row style={globalStyle.labelContainer}>
                    <Col size={5}>
                      <Button
                        success
                        style={[globalStyle.mb10, globalStyle.button]}
                        onPress={extendSiteQty}>
                        <Text>Request Additional Qty</Text>
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Text></Text>
                )}
                <Row style={globalStyle.labelContainer}>
                  <Col size={5}>
                    <Button
                      warning
                      style={[globalStyle.mb10, globalStyle.button]}
                      onPress={() => closeModal()}>
                      <Text style={{}}>Close</Text>
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </Container>
          </Modal>
        </Content>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = {startSetSiteStatus, handleError};

export default connect(mapStateToProps, mapDispatchToProps)(SiteDetail);
