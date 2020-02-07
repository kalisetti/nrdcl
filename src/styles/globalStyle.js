import {StyleSheet, Dimensions} from 'react-native';
import Config from 'react-native-config';
import { Right } from 'native-base';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 70,
  },

  listContent: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  ma15: {
    marginHorizontal: 15,
    marginVertical: 15,
  },

  mb10: {
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft:5
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    maxHeight: 50,
  },

  icon: {
    color: Config.ICON_COLOR,
  },

  iconText: {
    fontWeight: 'bold',
    color: Config.ICON_COLOR,
  },

  mb50: {
    marginBottom: 51,
  },

  mapcontainer: {
    width: 400,
    height: 300,
    justifyContent: 'space-around',
    alignSelf: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  cidContainer: {
    width: 400,
    height: 200,
    marginBottom: 15,
  },

  homeButton: {
    justifyContent: 'space-evenly',
    borderWidth: 0.2,
    borderColor: Config.APP_HEADER_COLOR,
  },

  tableHeader: {
    backgroundColor: Config.TABLE_HEADER_COLOR,
  },

  homeIcon: {
    color: Config.APP_HEADER_COLOR,
    fontSize: 40,
  },

  modeIcon: {
    color: Config.APP_HEADER_COLOR,
    fontSize: 90,
  },

  smallIcon: {
    color: Config.APP_HEADER_COLOR,
    fontSize: 20,
    paddingRight:10
  },

  homeIconText: {
    fontWeight: 'bold',
    color: Config.APP_HEADER_COLOR,
  },

  siteCol: {borderRightWidth: 0.2, borderColor: 'white'},

  siteItem: {
    fontSize: 13,
    paddingLeft:5
  },

  emptyString: {alignSelf: 'center', color: 'red', fontSize: 25},

  center: {alignSelf: 'center'},

  labelContainer: {
    marginBottom: 10,
  },

  label: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    
  },

  tableContainer: {
    marginBottom: 10,
    borderWidth: 0.5,
    // paddingLeft:4
  },

  tableHeaderContainer: {
    borderWidth: 0.5,
    backgroundColor: Config.TABLE_HEADER_COLOR,
  },

  rowContainer: {
    borderWidth: 0.5,
  },

  colContainer: {
    borderRightWidth: 0.5,
    paddingLeft:3
  },

  modal: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderColor: Config.TABLE_HEADER_COLOR,
    borderWidth: 3,
    padding: 10,
    width: Dimensions.get('window').width * 0.9,
    marginHorizontal: Dimensions.get('window').width * 0.05,
    marginTop: Dimensions.get('window').height * 0.1,
  },

  modalButtonContainer: {
    justifyContent: 'space-between',
  },

  itemButton: {width: '45%', justifyContent: 'center'},
  button: {justifyContent: 'center'},
  moneyFormat:{
    marginRight:-50
  },

  fieldSet:{
    margin: 10,
    paddingBottom: 10,
    paddingTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'grey'
},
legend:{
    position: 'absolute',
    top: -10,
    left: 10,
    color:'grey',
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF'
},
dialogueInput: {
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: 'grey',
  padding:5
},

errorMsg: {
  fontStyle: 'italic',
  color:'red',
  paddingLeft:10
},

italicFont: {
  fontStyle: 'italic',
},


});
