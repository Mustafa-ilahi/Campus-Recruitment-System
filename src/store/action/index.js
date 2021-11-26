function storeData(role, email) {
  return {
    type: 'ADD_DATA',
    role: role,
    email: email,
  };
}

function removeData() {
  return {
    type: 'REMOVE_DATA',
  };
}


export {storeData,removeData};
