import apiGet from '../../../request/actions/apiGet';

export const GET_SKILLS_START = 'GET_SKILLS_START';
export const GET_SKILLS_SUCCESS = 'GET_SKILLS_SUCCESS';
export const GET_SKILLS_FAILURE = 'GET_SKILLS_FAILURE';

export const getSkillsStart = () => ({
  type: GET_SKILLS_START,
});

export const getSkillsSuccess = data => ({
  type: GET_SKILLS_SUCCESS,
  data,
});

export const getSkillsFailure = error => ({
  type: GET_SKILLS_FAILURE,
  error,
});

export const getSkills = () => {
  return (dispatch) => {
    dispatch(getSkillsStart());
    return new Promise((resolve, reject) => {
      apiGet('/skills').then((response) => {
        const { data } = response;
        dispatch(getSkillsSuccess(data));
        resolve();
      }).catch((error) => {
        dispatch(getSkillsFailure(error));
        reject();
      });
    });
  };
};
