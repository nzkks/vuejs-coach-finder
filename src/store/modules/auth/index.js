import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  // This module is not namespaced. These files are just organized in a separate 'auth' module folder
  state() {
    return {
      token: null,
      userId: null,
    };
  },
  mutations,
  actions,
  getters,
};
