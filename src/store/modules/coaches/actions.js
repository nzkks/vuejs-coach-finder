export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const newCoach = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      areas: payload.areas,
      description: payload.description,
      hourlyRate: payload.rate,
    };

    // below creates a new table in firebase if it doesn't exist. If it does exist, it will update
    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('registerCoach', {
      ...newCoach,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
