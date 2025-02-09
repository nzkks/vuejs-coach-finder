export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    // isCoach(_, getters, _2, rootGetters) { // if linting doesn't allow unused params in above line
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) {
      return true;
    }

    const currentTimeStamp = new Date().getTime(); // in ms
    return (currentTimeStamp - lastFetch) / 1000 > 60; // convert the timestamp to seconds and compare. If the value is more than a minute, return true. That means update
  },
};
