import createDataContext from "./createDataContext";
// import AsyncStorage from "@react-native-community/async-storage"
import { AsyncStorage } from 'react-native';
import shopperApi from './../api/shopper';
import { navigate, navigateWithReset } from './../../RootNavigation';

const authReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ERROR":
            return { ...state, errorMessage: action.payload }
        case "CLEAR_ERROR_MESSAGE":
            return { ...state, errorMessage: "" };
        case "SIGNIN":
            return { token: action.payload, errorMessage: "" };
        case "SIGNOUT":
            return { token: null, errorMessage: "" }
        default:
            return state;
    }
}

const tryLocalLogin = (dispatch) => {
    return async () => {
        // await AsyncStorage.removeItem("token")
        const token = await AsyncStorage.getItem("token");
        if (token) {
            dispatch({ type: "LOGIN", payload: token });
            navigateWithReset("Lists");
        } else {
            navigateWithReset("SignUp");
        }
    }
}

const register = (dispatch) => {
    return async (username, password, confirmPassword) => {
        if (username.trim() === "") {
            dispatch({ type: "ADD_ERROR", payload: "Invalid username" })
            return;
        } else if (password !== confirmPassword) {
            dispatch({ type: "ADD_ERROR", payload: "Password fields do not match" })
            return;
        }
        try {
            const response = await shopperApi.post('/register', { username, password });
            await AsyncStorage.setItem("token", response.data.token)
            dispatch({ type: "SIGNIN", payload: response.data.token });
            navigateWithReset("Lists");
        } catch (e) {
            dispatch({ type: "ADD_ERROR", payload: "Username already taken :(" })
        }
    }
}

const login = (dispatch) => {
    return async (username, password) => {
        if (username.trim() === "") {
            dispatch({ type: "ADD_ERROR", payload: "Invalid username" })
            return;
        }
        try {
            const response = await shopperApi.post('/login', { username, password });
            await AsyncStorage.setItem("token", response.data.token)
            dispatch({ type: "SIGNIN", payload: response.data.token });
            navigateWithReset("Lists");
        } catch (e) {
            dispatch({ type: "ADD_ERROR", payload: "Invalid username/password :(" })
        }
    }
}

const logout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem("token");
        dispatch({ type: "SIGNOUT" })
        navigate("loginFlow");
    }
}

const clearErrorMessage = (dispatch) => {
    return async () => dispatch({ type: "CLEAR_ERROR_MESSAGE" })
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { tryLocalLogin, login, register, clearErrorMessage },
    { errorMessage: "" }
)