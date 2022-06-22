import InitialState from './InitialStates';
const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'setPreviousLocations':
      return {
        ...state,
        previosLocations: action.payLoad,
      };
  }
  return state;
};

export default reducer;
