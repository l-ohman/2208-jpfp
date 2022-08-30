import axios from "axios";

// actions and creators
const SET_ALL_STUDENTS = "SET_ALL_STUDENTS";
const ADD_NEW_STUDENT = "ADD_NEW_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";

const setAllStudents = (allStudents) => ({
  type: SET_ALL_STUDENTS,
  allStudents,
});

const addNewStudent = (newStudent) => ({
  type: ADD_NEW_STUDENT,
  newStudent,
});

const deleteStudentAction = (studentId) => ({
  type: DELETE_STUDENT,
  studentId,
});

// thunk(s)
export const fetchStudents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/students");
    dispatch(setAllStudents(data));
  } catch (error) {
    console.error(error);
  }
};

export const createStudent = (newStudent) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/students", newStudent);
    dispatch(addNewStudent(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudent = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(deleteStudentAction(studentId));
  } catch (error) {
    console.error(error);
  }
}

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_STUDENTS:
      return action.allStudents;
    case ADD_NEW_STUDENT:
      return [...state, action.newStudent];
    case DELETE_STUDENT:
      return [...state].filter(item => item.id !== action.studentId);
    default:
      return state;
  }
};

export default reducer;
