import axios from "axios";

const SET_SINGLE_ITEM = "SET_SINGLE_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const REMOVE_STUDENT_FROM_CAMPUS = "REMOVE_STUDENT_FROM_CAMPUS";

// 'item' can be student or campus
const setSingleItem = (item) => ({
  type: SET_SINGLE_ITEM,
  item,
});

export const updateSingleItem = (item) => ({
  type: UPDATE_ITEM,
  item,
});

export const removeStudentFromCampus = (studentId) => ({
  type: REMOVE_STUDENT_FROM_CAMPUS,
  studentId,
});

// 'type' being 'students' or 'campuses'
export const fetchSingleItem = (id, type) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/${type}/${id}`);
    dispatch(setSingleItem(data));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_ITEM:
      return action.item;
    case UPDATE_ITEM:
      return action.item;
    case REMOVE_STUDENT_FROM_CAMPUS:
      const studentList = state.students.filter(
        (student) => student.id !== action.studentId
      );
      return { ...state, students: studentList };
    default:
      return state;
  }
};

export default reducer;
