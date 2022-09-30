import {types} from "../types";

export const initialState = {
    user: null,
    loginModal: false,
}

export const reducers = {
    [types.SET_USER]: (state, user) => ({
        ...state,
        user,
    }),
    [types.SET_LOGIN_MODAL]: (state, loginModal) => ({
        ...state,
        loginModal,
    }),
};