import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { NavigationEvents } from 'react-navigation';
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
  View,
  Row,
  Col,
  Grid
} from 'native-base';
import {
  callAxios,
  handleError,
  getImages,
  setLoading,
} from '../../../../redux/actions/commonActions';
import { submitSalesOrder } from '../../../../redux/actions/siteActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';
import OrderQty from './OrderQty';
export const AddOrder = ({
  userState,
  commonState,
  navigation,
  submitSalesOrder,
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
  const [vehicle_capacity, setcapacity] = useState(undefined);
  const [noof_truck_load, settruckload] = useState(undefined);

  const [vehicle_capacities, setVehicle_capacities] = useState(undefined);
  const [vehicleCapacityErrorMsg, setVehicleCapacityErrorMsg] = useState('');
  const [vehicleErrorMsg, setVehicleErrorMsg] = useState('');
  const [truckLoadErrorMsg, setTruckLoadErrorMsg] = useState('');
  //all values
  const [all_sites, setall_sites] = useState([]);
  const [all_items, setall_items] = useState([]);
  const [all_branches, setall_branches] = useState([]);
  const [allprivatevehicles, setallprivatevehicles] = useState([]);

  const [all_vehicle_capacities, setall_vehicle_capacities] = useState([]);
  const [remitter_bank, setremitter_bank] = useState([undefined]);
  const [remitter_acc_no, setremitter_acc_no] = useState([undefined]);
  const [all_financial_inst, setall_financial_inst] = useState([]);
  const [totalOrderQty, settotalOrderQty] = useState(undefined);
  const [totalItemRate, settotalItemRate] = useState(undefined);
  const [totalTransportationRate, settotalTransportationRate] = useState(undefined);
  const [totalPayableAmount, settotalPayableAmount] = useState(undefined);
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
    getVehicleCapacity();
  }, [transport_mode]);

  useEffect(() => {
    setLoading(true);
    getFinancialInstList();
  }, [items]);

  useEffect(() => {
    setLoading(true);
    caculateInvoice();
  }, [items]);

  const setVehDetails = veh => {
    setcapacity(veh.vehicle_capacity);
    alert(veh.vehicle)
    setvehicle(veh.vehicle);
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
            filters: JSON.stringify({ site: site }),
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
            'site': site,
            'item': item,
            'branch': branch,
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

  const getVehicleCapacity = async () => {
    if (transport_mode === 'Common Pool') {
      try {
        const all_st = await callAxios('resource/Vehicle Capacity');
        setall_vehicle_capacities(all_st.data.data);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    } else {
      //self owned capcities
      setLoading(false);
    }
  };



  const resetModal = () => {
    setvehicle(undefined);
    setcapacity(undefined);
    settruckload(undefined);
    setVehicle_capacities(undefined)
  };

  const resetErrorMsg = () => {
    setVehicleErrorMsg('');
    setVehicleCapacityErrorMsg('');
    setTruckLoadErrorMsg('');
  };

  const addItem = item => {
    setItems([...items, item]);
  };

  const removeItem = index => {
    setItems(items.filter((_, ind) => ind !== index));
  };

  const addItemToList = () => {
    if ((transport_mode == 'Common Pool') && (vehicle_capacities == undefined)) {
      setVehicleCapacityErrorMsg('Vehicle capacity is required.');
    }
    else if ((transport_mode == 'Self Owned Transport') && (vehicle == undefined)) {
      setVehicleErrorMsg('Vehicle is required.');
    }
    else if (noof_truck_load == undefined || noof_truck_load.trim() == '') {
      setTruckLoadErrorMsg('No of truck load is required.');
    }
    else {
      resetErrorMsg();
      const item = {
        vehicle,
        vehicle_capacity: transport_mode == 'Self Owned Transport' ? vehicle_capacity : vehicle_capacities,
        noof_truck_load,
      };
      addItem(item);
      resetModal();

      setShowModal(false);
      const order_details = {
        transport_mode,
        items
      };
      // loop(order_details);

    }
  };



  const submitOrder = async () => {
    const order_details = {
      user: userState.login_id,
      site,
      item,
      branch,
      transport_mode,
      // bank_code: remitter_bank,
      // bank_account: remitter_acc_no,
      vehicles: items,//for self owned
      pool_vehicles: items// for common pool
    };
    // loop(order_details);
    submitSalesOrder(order_details);
  };

  const resetDataGrid = val => {
    if (val != transport_mode) {
      setItems(items.filter((_, ind) => 0 > ind));
    }
  };
  const caculateInvoice = async () => {
    //  const totalOrderQty = 0;

    if (items.length > 0) {
      var totalOrderQty = items.reduce(function (prev, cur) {
        return prev + (cur.noof_truck_load * cur.vehicle_capacity);
      }, 0);
      settotalOrderQty(totalOrderQty);

      var totalItemRate = totalOrderQty * itemDetail.item_rate;
      settotalItemRate(totalItemRate.toFixed(2));

      var totalTransportationRate = transport_mode == 'Common Pool' ? (totalOrderQty * itemDetail.tr_rate * itemDetail.distance) : 0.00
      settotalTransportationRate(totalTransportationRate.toFixed(2));

      var totalPayableAmount = totalTransportationRate + totalItemRate
      settotalPayableAmount(totalPayableAmount.toFixed(2));

    }
  };


  const getFinancialInstList = async () => {
    if (items.length > 0) {
      try {
        const params = {
          fields: JSON.stringify([
            'name',
            'bank_name',
            'bank_code',
          ]),
          filters: JSON.stringify([
            // ['user', '=', userState.login_id],
            ['bank_code', '!=', null],
          ]),

        };
        const bankList = await callAxios('resource/Financial Institution', 'get', params);
        // alert(bankList.data.data.bank_name)
        setall_financial_inst(bankList.data.data);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    } else {
      //self owned capcities
      setLoading(false);
    }
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
            {item && (
              <Row style={[globalStyles.tableContainer, globalStyles.mb50]}>
                <Grid>
                  <Row style={globalStyles.tableHeaderContainer}>
                    <Col size={2} style={globalStyles.colContainer}>
                      <Text>Region</Text>
                    </Col>
                    <Col size={1.5} style={globalStyles.colContainer}>
                      <Text>Rate (Nu.)</Text>
                    </Col>
                    <Col size={1.5} style={globalStyles.colContainer}>
                      <Text>L T (Days)</Text>
                    </Col>
                    <Col size={1.5}>
                      <Text>T Rate (Nu.)</Text>
                    </Col>
                  </Row>
                  {all_branches.map((item, idx) => (
                    <Row key={idx} style={globalStyles.rowContainer}>
                      <Col size={2} style={globalStyles.colContainer}>
                        <Text>{item.branch}</Text>
                      </Col>
                      <Col size={1.5} style={globalStyles.colContainer}>
                        <Text>{item.item_rate}</Text>
                      </Col>
                      <Col size={1.5} style={globalStyles.colContainer}>
                        <Text> {item.lead_time} </Text>
                      </Col>
                      <Col size={1.5}>
                        {(item.has_common_pool === 1) && (
                          <Text> {item.tr_rate} </Text>
                        )}
                      </Col>
                    </Row>
                  ))}
                </Grid>
              </Row>
            )}

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
                  <Text style={{ color: 'red' }}>
                    Will take approximately {itemDetail.lead_time} working days
                  {/* at th rate
                  of Nu. {itemDetail.item_rate}/{itemDetail.stock_uom}{' '} */}
                  </Text>
                </Item>

                <Item regular style={globalStyles.mb10}>
                  <Picker
                    mode="dropdown"
                    selectedValue={transport_mode}
                    onValueChange={val => {
                      setTransportMode(val)
                        , resetDataGrid(val)
                    }
                    }>
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
                      onPress={() => { setShowModal(true), resetErrorMsg(), resetModal() }}
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


            {items.length > 0 ? (
              // <Text></Text>
              <Fragment>
                <Row style={globalStyles.labelContainer}>
                  <Col size={3}>
                    <Text style={globalStyles.label}>Total Order Qty:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{totalOrderQty}</Text>
                  </Col>
                </Row>
                <Row style={globalStyles.labelContainer}>
                  <Col size={3}>
                    <Text style={globalStyles.label}>Total Item Amount:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{totalItemRate}</Text>
                  </Col>
                </Row>
                <Row style={globalStyles.labelContainer}>
                  <Col size={3}>
                    <Text style={globalStyles.label}>Total Transportation Amount:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{totalTransportationRate}</Text>
                  </Col>
                </Row>
                <Row style={globalStyles.labelContainer}>
                  <Col size={3}>
                    <Text style={globalStyles.label}>Total Payable Amount:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{totalPayableAmount}</Text>
                  </Col>
                </Row>
              </Fragment>
            ) : (
                <Text></Text>
              )}

            <Text></Text>
            <Button success style={globalStyles.mb50} onPress={submitOrder}>
              <Text>Place Order</Text>
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

            {(transport_mode === 'Common Pool') && (
              <Item regular style={globalStyles.mb10}>
                <Picker
                  mode="dropdown"
                  selectedValue={vehicle_capacities}
                  onValueChange={val => { setVehicle_capacities(val), resetErrorMsg() }
                  }>
                  <Picker.Item
                    label={'Select Vehicle Capacity'}
                    value={undefined}
                    key={-1}
                  />
                  {all_vehicle_capacities &&
                    all_vehicle_capacities.map((pur, idx) => {
                      return (
                        <Picker.Item label={pur.name} value={pur.name} key={idx} />
                      );
                    })}
                </Picker>
              </Item>
            )}

            {(transport_mode === 'Self Owned Transport') && (
              <Item regular style={globalStyles.mb10}>
                <Picker
                  mode="dropdown"
                  selectedValue={vehicle}
                  onValueChange={val => { setVehDetails(val), setVehicleErrorMsg('') }}
                >
                  <Picker.Item
                    label={'Select Vehicle'}
                    value={undefined}
                    key={-1}
                  />
                  {allprivatevehicles &&
                    allprivatevehicles.map((val, idx) => {
                      // alert(val.vehicle)
                      return (
                        <Picker.Item label={val.vehicle} value={val} key={idx} />
                      );
                    })}
                </Picker>
              </Item>
            )}
            {(vehicle || vehicle_capacities) && (
              <Fragment>
                {vehicle && (
                  <Item regular style={globalStyles.mb10}>
                    <Input disabled value={vehicle_capacity} placeholder="Capacity" />
                  </Item>
                )}

                <Item regular style={globalStyles.mb10}>
                  <Input
                    value={noof_truck_load}
                    onChangeText={val => { settruckload(val), setTruckLoadErrorMsg('') }}
                    placeholder="No of Truck Load"
                    keyboardType={'numeric'}
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
              <Button danger onPress={() => { setShowModal(false), setvehicle(undefined) }}>
                <Text>Cancel</Text>
              </Button>
            </Container>

            <Container>
              <View>
                <Text style={globalStyles.errorMsg}>
                  {vehicleCapacityErrorMsg}{vehicleErrorMsg}{truckLoadErrorMsg}
                </Text>
              </View>
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
  submitSalesOrder,
  handleError,
  getImages,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrder);