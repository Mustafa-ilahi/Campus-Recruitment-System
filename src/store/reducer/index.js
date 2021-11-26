const initialState = {
  role: '',
  email: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA': {
      return {...state, role: action.role, email: action.email};
    }
    case 'REMOVE_DATA':{
      return {...state, role: null, email:null};
    }

    default: {
      return state;
    }
  }
};

export default reducer;
