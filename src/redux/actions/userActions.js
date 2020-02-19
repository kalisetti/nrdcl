import { Platform } from 'react-native';
import CookieManager from 'react-native-cookies';
import setCookie from 'set-cookie-parser';
import Config from 'react-native-config';
import { LOGIN, LOGOUT, SET_MODE, SET_PROFILE_SUBMITTED } from './actionTypes';
import {
  showToast,
  setLoading,
  callAxios,
  handleError,
  attachFile,
} from './commonActions';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  pinResetSchema,
  userRegistrationSchema,
  userProfileSchema,
  loginSchema,
  pinSchema,
} from '../../validation/schema/userSchema';
import NavigationService from '../../components/base/navigation/NavigationService';

export const login = userData => {
  return {
    type: LOGIN,
    payload: userData,
  };
};

export const startLogin = (login_id, pin) => {
  return async dispatch => {
    try {
      await loginSchema.validate({ login_id, pin });

      const formData = new FormData();
      formData.append('usr', login_id);
      formData.append('pwd', pin);
      formData.append('device', 'mobile');

      let response = await fetch(Config.API_URL + 'method/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw { message: 'Invalid Login' };
      }

      var combinedCookieHeader = response.headers.get('Set-Cookie');

      if (Platform.OS === 'ios') {
        var splitCookieHeaders = setCookie.splitCookiesString(
          combinedCookieHeader,
        );
        var cookies = setCookie.parse(splitCookieHeaders);

        for (let id in cookies) {
          await CookieManager.setFromResponse(Config.BASE_URL, cookies[id]);
        }
      }

      if (Platform.OS === 'android') {
        await CookieManager.setFromResponse(
          Config.BASE_URL,
          combinedCookieHeader,
        );
      }

      const user_details = await axios.get(
        Config.API_URL + 'method/frappe.auth.get_loggedin_user_details',
      );

      await CookieManager.clearAll();

      //check user is blacklisted or not
      if (user_details.data.blacklisted) {
        throw {
          message: `User prevented from using system. Please contact ${Config.PHONE}`,
        };
      }

      //set axios authorization header
      const token = `token ${user_details.data.api_key}:${user_details.data.api_secret}`;
      axios.defaults.headers.common['Authorization'] = token;
      const username = `nrdcl${user_details.data.login_id}`;

      //Store token and login_id for persistence
      await AsyncStorage.multiRemove(['nrdcl_token', 'nrdcl_username']);
      await AsyncStorage.multiSet([
        ['nrdcl_token', token],
        ['nrdcl_username', username],
      ]);

      dispatch(login(user_details.data));
      dispatch(setLoading(false));

      //redirect user to appropiate palce based on profile verification
      if (user_details.data.profile_verified) {
        NavigationService.navigate('ModeSelector');
      } else {
        NavigationService.navigate('UserDetail');
      }
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const startLogout = () => {
  return async dispatch => {
    //call logout method
    try {
      await callAxios('method/logout');
      axios.defaults.headers.common['Authorization'] = null;
      await AsyncStorage.removeItem('nrdcl_token');
      dispatch(logout());
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

export const setMode = mode => {
  return {
    type: SET_MODE,
    payload: mode,
  };
};

export const setProfileUpdated = () => {
  return {
    type: SET_PROFILE_SUBMITTED,
  };
};

//send_pin(full_name, login_id, mobile_no)
export const startPin = (
  fullname,
  loginid,
  mobileno,
  alternate_mobile_no,
  request_type = 'signup',
) => {
  return async dispatch => {
    const params = {
      full_name: fullname,
      login_id: loginid,
      mobile_no: mobileno,
      alternate_mobile_no: alternate_mobile_no,
      request_type,
    };

    try {
      //validate first
      await pinSchema.validate(params);
      dispatch(setLoading(true));
      const res = await callAxios(
        'method/frappe.core.doctype.user.user.send_pin',
        'post',
        params,
      );
      dispatch(showToast(`PIN sent to ${mobileno}`, 'success'));
      // dispatch(setLoading(false));
      return res;
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

//send_pin(full_name, login_id, mobile_no)
export const startResetPin = (loginid, mobileno) => {
  return async dispatch => {
    const params = {
      login_id: loginid,
      mobile_no: mobileno,
    };

    try {
      //validate first
      await pinResetSchema.validate(params);
      dispatch(setLoading(true));
      const res=await callAxios(
        'method/frappe.core.doctype.user.user.crm_reset_password',
        'post',
        params,
      );
      if(res.status==200){
        dispatch(setLoading(false));
        dispatch(showToast(`PIN sent to ${mobileno}`, 'success'));
        NavigationService.navigate('Login')

      }
     
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

//crm_sign_up(full_name, login_id, mobile_no, email, pin)
export const startRegister = (fullname, loginid, mobileno, alternate_mobile_no, email, pin) => {
  return async dispatch => {
    //validate user details
    const params = {
      full_name: fullname,
      login_id: loginid,
      mobile_no: mobileno,
      alternate_mobile_no: alternate_mobile_no,
      email,
      pin,
    };
    try {
     
      await userRegistrationSchema.validate(params);
      dispatch(setLoading(true));
      await callAxios(
        'method/frappe.core.doctype.user.user.crm_sign_up',
        'post',
        params,
      );
      // dispatch(showToast(`User Registered`, 'success'));
      NavigationService.navigate('Login');;
      //Start Login
      dispatch(startLogin(loginid, pin));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

export const startProfileSubmission = (userRequest, frontImage = [],
  backImage = []) => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      await userProfileSchema.validate(userRequest);
      let res = await callAxios(
        'resource/User Request/',
        'POST',
        {},
        userRequest,
      );
      const docname = res.data.data.name;
      const doctype = res.data.data.doctype;

      frontImage.map(async image => {
        await attachFile(doctype, docname, image);
      });

      // backImage.map(async image => {
      //   await attachFile(doctype, docname, image);
      // }); 

      // const front = await attachFile(
      //   doctype,
      //   docname,
      //   frontImage,
      //   `${userRequest.new_cid}_front.jpg`,
      // );

      // const back = await attachFile(
      //   doctype,
      //   docname,
      //   backImage,
      //   `${userRequest.new_cid}_back.jpg`,
      // );

      // res = await callAxios(
      //   `resource/${doctype}/${docname}`,
      //   'put',
      //   {},
      //   {
      //     new_cid_file_front: front,
      //     new_cid_file_back: back,
      //   },
      // );

      dispatch(
        showToast('Your details has been submitted for approval', 'success'),
      );
      dispatch(setProfileUpdated());
      dispatch(setLoading(false));
      NavigationService.navigate('UserDetail');
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};
