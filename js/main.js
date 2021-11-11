import { deactivationUserForm } from './user-form.js';
import { deactivationFilterForm } from './filter-form.js';
import { mapLoad, setMapDefaultParameters } from './map.js';
import { getData } from './data.js';

deactivationUserForm();
deactivationFilterForm();

mapLoad(() => {
  setMapDefaultParameters();
  getData();
});

