import React, { Fragment } from 'react';
import { Text, Button, Icon, Grid, Row, Col } from 'native-base';
import globalStyles from '../../../../styles/globalStyle';

const OrderQty = ({ data, removeItem, transport_mode }) => {
  const RenderItem = ({ item, index }) => {
    return (
      <Row
        size={1}
        style={{
          borderWidth: 0.2,
          borderColor: 'black',
        }}>
        {(transport_mode === 'Self Owned Transport' || transport_mode === 'Private Pool') ? (
          <Col size={2} style={globalStyles.colContainer}>
            <Text style={globalStyles.siteItem}>{item.vehicle}</Text>
          </Col>
        ) : (
            <Fragment></Fragment>
          )}
        <Col size={1} style={globalStyles.colContainer}>
          <Text style={globalStyles.siteItem}>{item.vehicle_capacity}</Text>
        </Col>
        <Col size={1} style={globalStyles.colContainer}>
          <Text style={globalStyles.siteItem}>{item.noof_truck_load}</Text>
        </Col>
        <Col size={1}>
          <Button transparent small onPress={() => removeItem(index)}>
            <Icon name="delete" type="AntDesign" style={{ color: 'red' }} />
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Grid
      style={{
        width: '100%',
        marginHorizontal: 0,
      }}>
      {data.length == 0 ? (
        <Fragment></Fragment>
      ) : (
          <Row
            size={1}
            style={{
              borderWidth: 0.2,
              borderColor: 'black',
              // backgroundColor: 'grey',
            }}>
            {(transport_mode === 'Self Owned Transport' || transport_mode === 'Private Pool') ? (
              <Col size={2} style={globalStyles.tableHeaderContainer}>
                <Text style={globalStyles.siteItem}>{'Vehicle'}</Text>
              </Col>
            ) : (
                <Fragment></Fragment>
              )}
            <Col size={1} style={globalStyles.tableHeaderContainer}>
              <Text style={globalStyles.siteItem}>{'Capacity'}</Text>
            </Col>
            <Col size={1} style={globalStyles.tableHeaderContainer}>
              <Text style={globalStyles.siteItem}>{'Truck Load'}</Text>
            </Col>
            <Col size={1} style={globalStyles.tableHeaderContainer}>
              <Text style={globalStyles.siteItem}>{'Remove'}</Text>
            </Col>
          </Row>
        )}

      {data.map((val, index) => {
        return <RenderItem item={val} index={index} key={index} />;
      })}
    </Grid>
  );
};

export default OrderQty;