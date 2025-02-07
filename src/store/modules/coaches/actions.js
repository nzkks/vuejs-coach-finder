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
      `https://vue-http-demo-261a6-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );

    if (!response.ok) {
      // error...
    }

    // const responseData = await response.json();

    context.commit('registerCoach', {
      ...newCoach,
      id: userId,
    });
  },
};
