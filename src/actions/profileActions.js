import Axios from "./../http/dataBase/user";
export const EDIT_PROFILE = "Edit_Profile";
export const REMOVE_PROFILE = "Remove_Profile";
export const REMOVE_DATA = "Remove_Data"; 
export const FETCH_PROFILE = "Fetch_Profile";


export const editProfile = profile => dispatch => {
    const tempProfile={
        Name: profile.Name,
        GivenName: profile.Surname,
        Photo: profile.Photo
    };

    const tempPhoto = profile.Photo || null;
    const formData= new FormData();
    if(tempPhoto){
        formData.append('photo', tempPhoto);
    }
    formData.append('user', JSON.stringify(tempProfile));
    return Axios.updateUserProfile(formData)
        .then(response => 
            dispatch (editProfileSuccess(response.data)
    ));
}


const editProfileSuccess = ({ Name, Surname, Photo }) => ({
    type: EDIT_PROFILE,
    payload: {
        Name,
        Surname,
        Photo
     }
});

  const removeProfileSuccess = () => ({
    type: REMOVE_PROFILE
  });


  export const removeProfile = () => dispatch => {
      return Axios.deleteUserProfile().then(response => {
          dispatch(removeProfileSuccess()
)})};
 
export const fetchProfile = () =>  dispatch => 
     Axios.getInfoAboutUser()
        .then(response => {
            dispatch(fetchProfileSuccess(response))})
        .catch(error => {throw error});

const fetchProfileSuccess = user => ({
        type: FETCH_PROFILE,
        payload: user
     })



// export const removeProfile = () => dispatch => {
//     //   console.log("Hello");
//        return Axios.deleteUserProfile().then(dispatch(removeProfileSuccess()))};


// export const removeProfile = () => dispatch => {
//     //   console.log("Hello");
//        return Axios.deleteUserProfile().then(response => {
//            console.log(response);
//            dispatch(removeProfileSuccess()
//          )})};
