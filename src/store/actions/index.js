import {types} from "../types";

const actions = {
    [types.SET_USER]:
        (dispatch) =>
        (value = {}) => {
            dispatch({
                type: types.SET_USER,
                payload: value,
            })
        },
    [types.SET_LOGIN_MODAL]:
        (dispatch) =>
        (value = {}) => {
            dispatch({
                type: types.SET_LOGIN_MODAL,
                payload: value,
            })
        },
}

export default actions;