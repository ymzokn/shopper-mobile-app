import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import * as RootNavigation from '../../RootNavigation';

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const tryLocalLogin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            dispatch({ type: "LOGIN", payload: token });
            RootNavigation.navigate("Lists");
        } else {
            RootNavigation.navigate("SignUp");
        }
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { tryLocalLogin },
    {}
)