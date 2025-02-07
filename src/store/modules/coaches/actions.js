export default {
  registerCoach(context, payload) {
    const newCoach = {
      id: 'c3',
      firstName: payload.firstName,
      lastName: payload.lastName,
      areas: payload.areas,
      description: payload.description,
      hourlyRate: payload.rate,
    };

    context.commit('registerCoach', newCoach);
  },
};
