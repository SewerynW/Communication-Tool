import Axios from "./../http/dataBase/user";
export const EDIT_PROFILE = "Edit_Profile";
export const REMOVE_PROFILE = "Remove_Profile";
export const REMOVE_DATA = "Remove_Data";
export const FETCH_PROFILE = "Fetch_Profile";

export const editProfile = profile => dispatch => {
  const formData = new FormData();
  const userPhoto = profile.photo;
  const userProfile = {
    Name: profile.name,
    GivenName: profile.lastName
  };
  formData.append("photo", userPhoto);
  formData.append("user", JSON.stringify(userProfile));

  return Axios.updateUserProfile(formData).then(response =>
    dispatch(editProfileSuccess(response))
  );
};

const editProfileSuccess = ({ Name, GivenName, Id, Photo }) => ({
  type: EDIT_PROFILE,
  payload: {
    Name,
    GivenName,
    Photo
  }
});

const removeProfileSuccess = () => ({
  type: REMOVE_PROFILE
});

export const removeProfile = () => dispatch => {
  return Axios.deleteUserProfile().then(response => {
    dispatch(removeProfileSuccess());
  });
};

export const fetchProfile = () => dispatch =>
  Axios.getInfoAboutUser()
    .then(response => {
      dispatch(fetchProfileSuccess(response));
    })
    .catch(error => {
      throw error;
    });

const fetchProfileSuccess = user => ({
  type: FETCH_PROFILE,
  payload: user
});
