import axios from "axios";

const SET_SINGLE_ITEM = "SET_SINGLE_ITEM";
const UPDATE_SINGLE_ITEM = "UPDATE_SINGLE_ITEM";

// 'item' can be student or campus
const setSingleItem = (item) => ({
  type: SET_SINGLE_ITEM,
  item,
});

const updateSingleItemAction = (item) => ({
  type: UPDATE_SINGLE_ITEM,
  item,
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

export const updateSingleItem = (item, pluralType) => async (dispatch) => {
  try {
    const { data, status, statusText } = await axios.put(`/api/${pluralType}/${item.id}`, item);
    if (status !== 200) {
      throw new Error(statusText);
    }
    dispatch(updateSingleItemAction({ ...item, ...data }));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_ITEM:
      return action.item;
    case UPDATE_SINGLE_ITEM:
      return action.item;
    default:
      return state;
  }
};

export default reducer;
