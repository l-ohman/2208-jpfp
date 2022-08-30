import axios from "axios";

// actions and creators
const SET_ALL_CAMPUSES = "SET_ALL_CAMPUSES";
const ADD_NEW_CAMPUS = "ADD_NEW_CAMPUS";

const setAllCampuses = (allCampuses) => ({
  type: SET_ALL_CAMPUSES,
  allCampuses,
});

const addNewCampus = (newCampus) => ({
  type: ADD_NEW_CAMPUS,
  newCampus,
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

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_CAMPUSES:
      return action.allCampuses;
    case ADD_NEW_CAMPUS:
      return [...state, action.newCampus];
    default:
      return state;
  }
};

export default reducer;
