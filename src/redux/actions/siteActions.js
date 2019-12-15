import {
  showToast,
  setLoading,
  callAxios,
  handleError,
  attachFile,
} from './commonActions';
import {
  siteItemSchema,
  siteSchema,
  siteStatusSchema,
  siteExtensionSchema,
  qtyItemExtensionSchema,
  qtyExtensionSchema,
  driverInfoSchema,
  vehilceSchema,
} from '../../validation/schema/siteSchema';
import NavigationService from '../../components/base/navigation/NavigationService';

/**
 *
 * @param {details of site to be registered} site_info
 * @param {any supporting documents} images
 */
export const startSiteRegistration = (site_info, images) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      site_info.items.map(async item => {
        try {
          await siteItemSchema.validate(item);
        } catch (error) {
          dispatch(handleError(error));
        }
      });

      await siteSchema.validate(site_info);

      let res = await callAxios(
        'resource/Site Registration/',
        'POST',
        {},
        site_info,
      );

      const docname = res.data.data.name;
      const doctype = res.data.data.doctype;

      images.map(async image => {
        await attachFile(doctype, docname, image);
      });

      NavigationService.navigate('SiteDashboard');
      dispatch(setLoading(false));
      dispatch(showToast('Site Registration request sent', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

/**
 *
 * @param {details of site to change status} site_info
 */
export const startSiteStatusChange = site_info => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      await siteStatusSchema.validate(site_info);

      await callAxios('resource/Site Status/', 'POST', {}, site_info);

      NavigationService.navigate('ListSite');
      dispatch(setLoading(false));
      dispatch(showToast('Your request has been sent', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

/**
 *
 * @param {details of site to extend end date} site_info
 * @param {supporting documents, if any} images
 */
export const startSiteExtension = (site_info, images) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      await siteExtensionSchema.validate(site_info);

      const res = await callAxios(
        'resource/Site Extension/',
        'POST',
        {},
        site_info,
      );

      const docname = res.data.data.name;
      const doctype = res.data.data.doctype;

      images.map(async image => {
        await attachFile(doctype, docname, image);
      });

      NavigationService.navigate('ListSite');
      dispatch(setLoading(false));
      dispatch(showToast('Your request has been sent', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

/**
 *
 * @param {details of qty extension} site_info
 * @param {supporting documents} images
 */
export const startQtyExtension = (site_info, images) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      site_info.items.map(async item => {
        try {
          await qtyItemExtensionSchema.validate(item);
        } catch (error) {
          dispatch(handleError(error));
        }
      });

      await qtyExtensionSchema.validate(site_info);

      const res = await callAxios(
        'resource/Quantity Extension/',
        'POST',
        {},
        site_info,
      );

      const docname = res.data.data.name;
      const doctype = res.data.data.doctype;

      images.map(async image => {
        await attachFile(doctype, docname, image);
      });

      NavigationService.navigate('ListSite');
      dispatch(setLoading(false));
      dispatch(showToast('Your request has been sent', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

/**
 *
 * @param {details of vehicle to register} vehicle_info
 * @param {bluebook document} bluebook
 * @param {marriage certificate, if any} mc
 */
export const startVehicleRegistration = (
  vehicle_info,
  bluebook = [],
  mc = [],
) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      await vehilceSchema.validate(vehicle_info);

      let res = await callAxios(
        'resource/Transport Request/',
        'POST',
        {},
        vehicle_info,
      );

      const docname = res.data.data.name;
      const doctype = res.data.data.doctype;

      bluebook.map(async image => {
        await attachFile(doctype, docname, image);
      });

      mc.map(async image => {
        await attachFile(doctype, docname, image);
      });

      NavigationService.navigate('ListVehicle');
      dispatch(setLoading(false));
      dispatch(showToast('Vehicle Registration request sent', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

/**
 *
 * @param {driver's information} driver_info
 */
export const startUpdateDriverDetail = driver_info => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      await driverInfoSchema.validate(driver_info);

      await callAxios('resource/Vehicle Update/', 'POST', {}, driver_info);

      NavigationService.navigate('ListVehicle');
      dispatch(setLoading(false));
      dispatch(showToast('Update Info request sent', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

/**
 *
 * @param {site data to set site active or inactive} site_data
 */
export const startSetSiteStatus = site_data => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      await callAxios(
        'method/erpnext.crm_api.set_site_status',
        'post',
        site_data,
      );

      dispatch(setLoading(false));
      NavigationService.navigate('ListSite');
      dispatch(showToast('Successfully changed site status', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

/**
 *
 * @param {vehicle no to be deregistered} vehicle
 */
export const startVehicleDeregistration = vehicle => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      await callAxios(
        'method/erpnext.crm_api.deregister_vehicle',
        'post',
        vehicle,
      );

      dispatch(setLoading(false));
      NavigationService.navigate('ListVehicle');
      dispatch(showToast('Successfully deregistered vehicle', 'success'));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};
