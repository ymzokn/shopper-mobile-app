import axios from "axios"
import { AsyncStorage } from 'react-native';
import { navigateWithReset } from './../../RootNavigation';

let url;
if (__DEV__) {
    url = 'http://localhost:3000';
    // url = 'http://localhost:3000';
} else {
    url = 'https://sleepy-savannah-10606.herokuapp.com';
}

const instance = axios.create({
    baseURL: url
});


instance.interceptors.request.use(
    async req => {
        const token = await AsyncStorage.getItem("token")
        if (token) {
            req.headers.Authorization = `Bearer ${token}`
        }
        return req
    },
    err => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    async res => {
        return res
    },
    async err => {
        if (err.response.status === 401) {
            await AsyncStorage.removeItem("token")
            navigateWithReset("SignIn")
        }
        return Promise.reject(err)
    }
)

export default instance