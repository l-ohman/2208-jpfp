import axios from "axios";

// actions and creators
const SET_ALL_CAMPUSES = "SET_ALL_CAMPUSES";
const ADD_NEW_CAMPUS = "ADD_NEW_CAMPUS";
const DELETE_CAMPUS = "DELETE_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";

const setAllCampuses = (allCampuses) => ({
  type: SET_ALL_CAMPUSES,
  allCampuses,
});

const addNewCampus = (newCampus) => ({
  type: ADD_NEW_CAMPUS,
  newCampus,
});

const deleteCampusAction = (campusId) => ({
  type: DELETE_CAMPUS,
  campusId,
});

const updateCampusAction = (campus) => ({
  type: UPDATE_CAMPUS,
  campus,
});

// thunk(s)
export const fetchCampuses = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/campuses");
    dispatch(setAllCampuses(data));
  } catch (error) {
    console.error(error);
  }
};

export const createCampus = (newCampus) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/campuses", newCampus);
    dispatch(addNewCampus(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteCampus = (campusId) => async (dispatch) => {
  try {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(deleteCampusAction(campusId));
  } catch (error) {
    console.error(error);
  }
};

export const updateCampus = (campus) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/campuses/${campus.id}`, campus);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    dispatch(updateCampusAction(response.data));
    return [true, response.statusText];
  } catch (error) {
    console.error(error);
    return [false, error.message];
  }
};

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_CAMPUSES:
      return action.allCampuses;
    case ADD_NEW_CAMPUS:
      return [...state, action.newCampus];
    case DELETE_CAMPUS:
      return [...state].filter((item) => item.id !== action.campusId);
    case UPDATE_CAMPUS:
      const newState = [...state].filter((item) => item.id !== action.campus.id);
      return [...newState, action.campus];
    default:
      return state;
  }
};

export default reducer;
