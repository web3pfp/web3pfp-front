import {types} from "../types";

export const initialState = {
    pageName: null,
}

export const reducers = {
    [types.SET_PORTFOLIO_LIST]: (state, pageName) => ({
        ...state,
        pageName,
    }),
};