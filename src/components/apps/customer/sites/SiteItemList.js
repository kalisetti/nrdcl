import React from 'react';
import {Text, Button, Icon, Grid, Row, Col} from 'native-base';
import globalStyles from '../../../../styles/globalStyle';

const SiteItemList = ({data, removeItem}) => {
  const RenderItem = ({item, index}) => {
    return (
      <Row
        size={1}
        style={{
          borderWidth: 0.2,
          borderColor: 'black',
        }}>
        <Col size={2} style={globalStyles.siteCol}>
          <Text style={globalStyles.siteItem}>{item.item_sub_group}</Text>
        </Col>
        <Col size={1} style={globalStyles.siteCol}>
          <Text style={globalStyles.siteItem}>
            {item.expected_quantity} {item.uom}
          </Text>
        </Col>
        <Col size={2} style={globalStyles.siteCol}>
          <Text style={globalStyles.siteItem}>{item.branch}</Text>
        </Col>
        <Col size={1}>
          <Button transparent small onPress={() => removeItem(index)}>
            <Icon name="delete" type="AntDesign" style={{color: 'red'}} />
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <Grid
      style={{
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10,
      }}>
      {data.length == 0 ? (
        <Text></Text>
      ) : (
        <Row
          size={1}
          style={{
            borderWidth: 0.2,
            borderColor: 'black',
            backgroundColor: 'grey',
          }}>
          <Col size={2} style={globalStyles.siteCol}>
            <Text style={globalStyles.siteItem}>{'Item'}</Text>
          </Col>
          <Col size={1} style={globalStyles.siteCol}>
            <Text style={globalStyles.siteItem}>{'Qty'}</Text>
          </Col>
          <Col size={2} style={globalStyles.siteCol}>
            <Text style={globalStyles.siteItem}>{'Source'}</Text>
          </Col>
          <Col size={1}></Col>
        </Row>
      )}

      {data.map((val, index) => {
        return <RenderItem item={val} index={index} key={index} />;
      })}
    </Grid>
  );
};

export default SiteItemList;
