import axios from "axios";

// actions and creators
const SET_ALL_STUDENTS = "SET_ALL_STUDENTS";

const setAllStudents = (allStudents) => {
    return {
        type: SET_ALL_STUDENTS,
        allStudents
    }
};

// thunk(s)
export const fetchStudents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/students");
    dispatch(setAllStudents(data));
  } catch (error) {
    console.error(error);
  }
};

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_STUDENTS:
      return action.allStudents;
    default:
      return state;
  }
};

export default reducer;
