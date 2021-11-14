import { deactivationUserForm, activationUserForm } from './user-form.js';
import { deactivationFilterForm, activationFilterForm, setFilterFormDefaultParameters, onFilterFormChange, getFilteredData } from './filter-form.js';
import { loadMap, setMapDefaultParameters } from './map.js';
import { getData } from './data.js';
import { showGetDataErrMsg } from './message.js';
import { debounce } from './util.js';
import { TIMEOUT_DELAY, DATA_EMPTY } from './constants.js';

let removeFilterFormChangeListener = () => {};

deactivationUserForm();
deactivationFilterForm(removeFilterFormChangeListener);

loadMap(() => {
  setMapDefaultParameters();

  const onSuccessGetData = (dataFromServer) => {
    activationFilterForm(() => {
      setFilterFormDefaultParameters(dataFromServer);
      removeFilterFormChangeListener = onFilterFormChange(
        debounce(() => getFilteredData(dataFromServer), TIMEOUT_DELAY));
    });
    activationUserForm(dataFromServer);
  };

  const onErrorGetData = () => {
    showGetDataErrMsg();
    activationUserForm(DATA_EMPTY);
  };

  getData(onSuccessGetData, onErrorGetData);
});
