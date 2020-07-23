import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as AuthContext } from "../context/AuthContext";
import Lists from './Lists';
import SignUp from './SignUp';

const ResolveAuthScreen = ({ navigation }) => {
    const { state, tryLocalLogin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalLogin();
    }, [])

    return null;
    // return (state.user ? <Lists /> : <SignUp />);
}

const styles = StyleSheet.create({

})

export default ResolveAuthScreen;