import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, SHOW_LOADER, SHOW_MODAL } from './types';

//* If redux-thunk sees a function returned from this middleware
//  r-t will automatically call this function and pass in dispatch as an arg
//* (if no other expression but return {}, can omit return phrase pre function)
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

/** REFACTOR **
export const fetchUser = () => {
  return funtion(dispatch) => {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
*/

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const showLoader = (show) => dispatch => {
  dispatch({ type: SHOW_LOADER, payload: show });
};

export const deleteSurvey = (surveyId) => async dispatch => {
  const res = await axios.delete('/api/surveys/delete', { params: { surveyId } });
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const creditsRequired = (show) => dispatch => {
  dispatch({ type: SHOW_MODAL, payload: show });
}