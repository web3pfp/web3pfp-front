import {types} from "../types";

const actions = {

    [types.SET_PORTFOLIO_LIST]:
        (dispatch) =>
        (value = {}) => {
            dispatch({
                type: types.SET_PORTFOLIO_LIST,
                payload: value,
            })
        },
}

export default actions;