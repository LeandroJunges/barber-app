export const initialState = {
  avatar: '',
  favorites: [],
  appoinments: []
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'serAvatar':
      return {...state, avatar: action.payload.avata};
      
      break;
  
    default:
      return state;
  }
}