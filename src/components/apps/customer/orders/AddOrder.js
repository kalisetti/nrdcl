import React, {useEffect, useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Config from 'react-native-config';

import {
  Container,
  Content,
  Form,
  Picker,
  Item,
  Button,
  Text,
  Input,
} from 'native-base';
import {
  callAxios,
  handleError,
  getImages,
  setLoading,
} from '../../../../redux/actions/commonActions';
import {startVehicleRegistration} from '../../../../redux/actions/siteActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';
import OrderQty from './OrderQty';

export const AddOrder = ({
  userState,
  commonState,
  navigation,
  startVehicleRegistration,
  handleError,
  setLoading,
}) => {
  //state info for forms
  let [, setState] = useState();

  const [site, setSite] = useState(undefined);
  const [item, setItem] = useState(undefined);
  const [branch, setBranch] = useState(undefined);
  const [itemDetail, setItemDetail] = useState(undefined);
  const [transport_mode, setTransportMode] = useState(undefined);
  const [vehicle, setvehicle] = useState(undefined);
  const [capacity, setcapacity] = useState(undefined);
  const [truckload, settruckload] = useState(undefined);

  //all values
  const [all_sites, setall_sites] = useState([]);
  const [all_items, setall_items] = useState([]);
  const [all_branches, setall_branches] = useState([]);
  const [allprivatevehicles, setallprivatevehicles] = useState([]);

  //modal
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);

  //For proper navigation/auth settings
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      //get all capacities
      setLoading(true);
      getSites();
    }
  }, []);

  useEffect(() => {
    setItem(undefined);
    setall_items([]);
    setLoading(true);
    getSiteItems();
  }, [site]);

  useEffect(() => {
    setBranch(undefined);
    setall_branches([]);
    setLoading(true);
    getAllBranches();
  }, [item]);

  useEffect(() => {
    setLoading(true);
    getItemDetails();
  }, [branch, item]);

  useEffect(() => {
    setLoading(true);
    getPrivateVehicles();
  }, [transport_mode]);

  const setVehDetails = veh => {
    setvehicle(veh.vehicle);
    setcapacity(veh.vehicle_capacity);
  };

  const getSites = async () => {
    try {
      const params = {
        fields: JSON.stringify([
          'name',
          'purpose',
          'construction_type',
          'location',
        ]),
        filters: JSON.stringify([
          ['user', '=', userState.login_id],
          ['enabled', '=', 1],
        ]),
      };

      const all_st = await callAxios('resource/Site', 'get', params);
      setall_sites(all_st.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const getSiteItems = async () => {
    if (site === undefined) {
      setLoading(false);
    } else {
      try {
        const all_it = await callAxios(
          'method/erpnext.crm_utils.get_site_items',
          'post',
          {
            filters: JSON.stringify({site: site}),
          },
        );

        setall_items(all_it.data.message);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const getAllBranches = async () => {
    if (item === undefined) {
      setLoading(false);
    } else {
      try {
        const all_it = await callAxios(
          'method/erpnext.crm_utils.get_branch_rate',
          'post',
          {
            item,
            site,
          },
        );

        setall_branches(all_it.data.message);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const getItemDetails = async () => {
    if (item === undefined || branch === undefined) {
      setLoading(false);
      setItemDetail(undefined);
    } else {
      try {
        const all_its = await callAxios(
          'method/erpnext.crm_utils.get_branch_rate',
          'post',
          {
            item,
            branch,
          },
        );

        setItemDetail(all_its.data.message[0]);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const getPrivateVehicles = async () => {
    if (transport_mode === 'Self Owned Transport') {
      try {
        const all_its = await callAxios(
          'method/erpnext.crm_utils.get_vehicles',
          'post',
          {
            user: userState.login_id,
          },
        );

        setallprivatevehicles(all_its.data.message);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    } else {
      //common pool capcities
      setLoading(false);
    }
  };

  const resetModal = () => {
    setvehicle(undefined);
    setcapacity(undefined);
    settruckload(undefined);
  };

  const addItem = item => {
    setItems([...items, item]);
  };

  const removeItem = index => {
    setItems(items.filter((_, ind) => ind !== index));
  };

  const addItemToList = () => {
    const item = {
      vehicle,
      capacity,
      truckload,
    };
    addItem(item);
    resetModal();
    setShowModal(false);
  };

  const submitVehicleInfo = async () => {
    const site_info = {
      approval_status: 'Pending',
      user: userState.login_id,
    };

    startVehicleRegistration(site_info);
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container>
      <NavigationEvents
        onWillFocus={_ => {
          setState({});
        }}
        onWillBlur={_ => {
          setState(undefined);
        }}
      />
      <Content style={globalStyles.content}>
        <Form>
          <Item regular style={globalStyles.mb10}>
            <Picker
              mode="dropdown"
              selectedValue={site}
              onValueChange={val => setSite(val)}>
              <Picker.Item label={'Select Site'} value={undefined} key={-1} />
              {all_sites &&
                all_sites.map((pur, idx) => {
                  return (
                    <Picker.Item
                      label={`${pur.name} \n(${pur.purpose} at ${pur.location})`}
                      value={pur.name}
                      key={idx}
                    />
                  );
                })}
            </Picker>
          </Item>
          <Item regular style={globalStyles.mb10}>
            <Picker
              mode="dropdown"
              selectedValue={item}
              onValueChange={val => setItem(val)}>
              <Picker.Item label={'Select Item'} value={undefined} key={-1} />
              {all_items &&
                all_items.map((pur, idx) => {
                  return (
                    <Picker.Item
                      label={`${pur[0]} \n(${pur[1]})`}
                      value={pur[0]}
                      key={idx}
                    />
                  );
                })}
            </Picker>
          </Item>
          <Item regular style={globalStyles.mb10}>
            <Picker
              mode="dropdown"
              selectedValue={branch}
              onValueChange={val => setBranch(val)}>
              <Picker.Item label={'Select Branch'} value={undefined} key={-1} />
              {all_branches &&
                all_branches.map((pur, idx) => {
                  return (
                    <Picker.Item
                      label={pur.branch}
                      value={pur.branch}
                      key={idx}
                    />
                  );
                })}
            </Picker>
          </Item>
          {itemDetail !== undefined ? (
            <Fragment>
              <Item regular style={globalStyles.mb10}>
                <Text style={{color: 'red'}}>
                  Will take approximately {itemDetail.lead_time} days at th rate
                  of Nu. {itemDetail.item_rate}/{itemDetail.stock_uom}{' '}
                </Text>
              </Item>

              <Item regular style={globalStyles.mb10}>
                <Picker
                  mode="dropdown"
                  selectedValue={transport_mode}
                  onValueChange={val => setTransportMode(val)}>
                  <Picker.Item
                    label={'Select Transport Mode'}
                    value={undefined}
                    key={-1}
                  />
                  <Picker.Item
                    label={'Self Owned Transport'}
                    value={'Self Owned Transport'}
                    key={0}
                  />
                  {itemDetail.has_common_pool === 1 && (
                    <Picker.Item
                      label={'Common Pool'}
                      value={'Common Pool'}
                      key={1}
                    />
                  )}
                </Picker>
              </Item>

              {transport_mode && (
                <Fragment>
                  <Button
                    info
                    onPress={() => setShowModal(true)}
                    style={globalStyles.mb10}>
                    {items.length > 0 ? (
                      <Text>Add More Qty</Text>
                    ) : (
                      <Text>Add Qty</Text>
                    )}
                  </Button>

                  <OrderQty
                    data={items}
                    removeItem={removeItem}
                    transport_mode={transport_mode}
                  />
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Text></Text>
          )}

          <Button success style={globalStyles.mb50} onPress={submitVehicleInfo}>
            <Text>Submit for Approval</Text>
          </Button>
        </Form>
      </Content>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <Content style={globalStyles.content}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 10,
              color: Config.APP_HEADER_COLOR,
            }}>
            Add Qty
          </Text>
          <Item regular style={globalStyles.mb10}>
            <Picker
              mode="dropdown"
              label={'Select Vehicle'}
              selectedValue={vehicle}
              onValueChange={val => setVehDetails(val)}>
              <Picker.Item
                label={'Select Vehicle'}
                value={undefined}
                key={-1}
              />
              {allprivatevehicles &&
                allprivatevehicles.map((val, idx) => {
                  return (
                    <Picker.Item label={val.vehicle} value={val} key={idx} />
                  );
                })}
            </Picker>
          </Item>
          {vehicle && (
            <Fragment>
              <Item regular style={globalStyles.mb10}>
                <Input disabled value={capacity} placeholder="Capacity" />
              </Item>
              <Item regular style={globalStyles.mb10}>
                <Input
                  value={truckload}
                  onChangeText={val => settruckload(val)}
                  placeholder="No of Truckload"
                />
              </Item>
            </Fragment>
          )}
          <Container
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              maxHeight: 50,
            }}>
            <Button success onPress={addItemToList}>
              <Text>Add Qty</Text>
            </Button>
            <Button danger onPress={() => setShowModal(false)}>
              <Text>Cancel</Text>
            </Button>
          </Container>
        </Content>
      </Modal>
    </Container>
  );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = {
  startVehicleRegistration,
  handleError,
  getImages,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrder);
