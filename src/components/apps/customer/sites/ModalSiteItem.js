import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {
  Container,
  Input,
  Content,
  Picker,
  Item,
  Button,
  Text,
  Textarea,
} from 'native-base';
import {callAxios} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import Config from 'react-native-config';

const SiteItem = ({
  showModal,
  setShowModal,
  addItem,
  all_sub_item,
  data = null,
}) => {
  const [idx, setidx] = useState(null);
  const [branch, setBranch] = useState(undefined);
  const [item_sub_group, setitem_sub_group] = useState(undefined);
  const [uom, setuom] = useState(null);
  const [expected_quantity, setexpected_quantity] = useState(null);
  const [transport_mode, settransport_mode] = useState(undefined);
  const [remarks, setremarks] = useState(null);

  const [common_pool, setcommon_pool] = useState(0);

  const [all_branch, setall_branch] = useState([]);

  useEffect(() => {
    if (item_sub_group) {
      setItemUom(item_sub_group);
      getAllBranch(item_sub_group);
    } else {
      setuom(null);
      setall_branch(null);
    }
    setexpected_quantity(null);
    settransport_mode(null);
    setBranch(null);
  }, [item_sub_group]);

  useEffect(() => {
    if (branch) {
      setCommonPool(branch);
    } else {
      setcommon_pool(0);
    }
  }, [branch]);

  const getAllBranch = async sub_group => {
    try {
      const all_branches = await callAxios(
        'method/erpnext.crm_api.branch_source',
        'post',
        {
          item_sub_group: sub_group,
        },
      );
      setall_branch(all_branches.data.message);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const setItemUom = item => {
    const actual_item = all_sub_item.find(val => val.name === item);
    if (actual_item) {
      setuom(actual_item.uom);
    }
  };

  const setCommonPool = selectedBranch => {
    const actual_branch = all_branch.find(val => val.branch === selectedBranch);
    if (actual_branch) {
      setcommon_pool(actual_branch.has_common_pool);
    }
  };

  const resetState = () => {
    setBranch(null);
    setitem_sub_group(null);
    setuom(null);
    setexpected_quantity(null);
    settransport_mode(null);
    setremarks(null);
    setcommon_pool(null);
    setall_branch(null);
    setidx(null);
  };

  const addItemToList = () => {
    const item = {
      idx,
      branch,
      item_sub_group,
      uom,
      expected_quantity,
      transport_mode,
      remarks,
    };
    addItem(item);
    resetState();
    setShowModal(false);
  };

  return (
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
          {data ? 'Update Item' : 'Add Item'}
        </Text>
        <Item regular style={globalStyles.mb10}>
          <Picker
            mode="dropdown"
            label={'Select Item'}
            selectedValue={item_sub_group}
            onValueChange={val => setitem_sub_group(val)}>
            <Picker.Item label={'Select Item'} value={undefined} key={-1} />
            {all_sub_item &&
              all_sub_item.map((val, idx) => {
                return (
                  <Picker.Item label={val.name} value={val.name} key={idx} />
                );
              })}
          </Picker>
        </Item>

        <Item regular style={globalStyles.mb10}>
          <Input
            disabled
            value={uom}
            onChangeText={val => setuom(val)}
            placeholder="Unit of Measure"
          />
        </Item>

        {item_sub_group && (
          <Item regular style={globalStyles.mb10}>
            <Picker
              mode="dropdown"
              selectedValue={branch}
              onValueChange={val => setBranch(val)}>
              <Picker.Item label={'Select Source'} value={undefined} key={-1} />
              {all_branch &&
                all_branch.map((val, idx) => {
                  return (
                    <Picker.Item
                      label={val.branch}
                      value={val.branch}
                      key={idx}
                    />
                  );
                })}
            </Picker>
          </Item>
        )}

        {branch && (
          <Item regular style={globalStyles.mb10}>
            {common_pool ? (
              <Picker
                mode="dropdown"
                selectedValue={transport_mode}
                onValueChange={val => settransport_mode(val)}>
                <Picker.Item
                  label={'Select Transport Mode'}
                  value={undefined}
                  key={-1}
                />
                <Picker.Item
                  label={'Common Pool'}
                  value={'Common Pool'}
                  key={0}
                />
                <Picker.Item
                  label={'Self Owned Transport'}
                  value={'Self Owned Transport'}
                  key={1}
                />
              </Picker>
            ) : (
              <Picker
                mode="dropdown"
                selectedValue={transport_mode}
                onValueChange={val => settransport_mode(val)}>
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
              </Picker>
            )}
          </Item>
        )}

        <Item regular style={globalStyles.mb10}>
          <Input
            value={expected_quantity}
            onChangeText={val => setexpected_quantity(val)}
            placeholder="Expected Quantity"
          />
        </Item>

        <Textarea
          rowSpan={5}
          width="100%"
          bordered
          placeholder="Remarks"
          value={remarks}
          onChangeText={val => setremarks(val)}
          style={globalStyles.mb10}
        />

        <Container
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxHeight: 50,
          }}>
          <Button success onPress={addItemToList}>
            <Text>Add Item</Text>
          </Button>
          <Button danger onPress={() => setShowModal(false)}>
            <Text>Cancel</Text>
          </Button>
        </Container>
      </Content>
    </Modal>
  );
};

export default SiteItem;
