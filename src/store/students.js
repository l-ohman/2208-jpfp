import axios from "axios";

// actions and creators
const SET_ALL_STUDENTS = "SET_ALL_STUDENTS";
const ADD_NEW_STUDENT = "ADD_NEW_STUDENT";
const DELETE_STUDENT = "DELETE_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";

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

const updateStudentAction = (student) => ({
  type: UPDATE_STUDENT,
  student,
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
};

export const updateStudent = (student) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/students/${student.id}`, student);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    dispatch(updateStudentAction(response.data));
  } catch (error) {
    console.error(error);
  }
};

// reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_STUDENTS:
      return action.allStudents;
    case ADD_NEW_STUDENT:
      return [...state, action.newStudent];
    case DELETE_STUDENT:
      return [...state].filter((item) => item.id !== action.studentId);
    case UPDATE_STUDENT:
      const newState = [...state].filter(
        (item) => item.id !== action.student.id
      );
      return [...newState, action.student];
    default:
      return state;
  }
};

export default reducer;
