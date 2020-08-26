import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TextInput as Input } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as RootNavigation from "../../RootNavigation"
import { Context as AuthContext } from "../context/AuthContext"
import { Overlay } from "react-native-elements";

const SignIn = () => {
    const { login, clearErrorMessage, state: { errorMessage } } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <>
            <View style={{ position: "relative", flex: 1 }} >
                <LinearGradient colors={["#7f00ff", "#e100ff"]} style={styles.background}>
                    <Image style={styles.img} source={require("../../assets/img/cart.jpg")}></Image>
                </LinearGradient>
                <View style={styles.top}>
                    <Text style={styles.text}>Welcome Back!</Text>
                    <Text style={styles.textSm}>Just login and enjoy the simplicity!</Text>
                </View>
                <View style={styles.center}>
                    <Input onChangeText={setUsername} value={username} style={styles.formInput} placeholder="Username" placeholderTextColor="white" autoCorrect={false} autoCorrect={false} autoCapitalize="none" />
                    <Input onChangeText={setPassword} value={password} style={styles.formInput} placeholder="Password" placeholderTextColor="white" autoCorrect={false} autoCorrect={false} autoCapitalize="none" />
                    <Button
                        onPress={() => login(username, password)} title="Login" buttonStyle={{ marginTop: 8, backgroundColor: "#FFE11A" }} titleStyle={{ paddingHorizontal: 16, color: "#7f00ff" }}
                    />
                    <TouchableOpacity onPress={() => RootNavigation.navigate("SignUp")}><Text style={{ margin: 16, color: "white" }}>Want to create a new account? Click here and join us.</Text></TouchableOpacity>
                </View>
                <Overlay
                    isVisible={errorMessage.length > 0}
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="red"
                    width="auto"
                    height="auto"
                    onBackdropPress={clearErrorMessage}
                    overlayStyle={{ padding: 32 }}
                >
                    <Text>{errorMessage}</Text>
                </Overlay>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    img: {
        resizeMode: "cover",
        height: "100%",
        opacity: 0.2,
    },
    top: {
        paddingTop: 32,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 16
    },
    center: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    text: {
        // color: "rgba(0, 0, 0, 0.6)",
        // color: "rgba(255, 255, 255, 1)",
        fontFamily: "serif",
        color: "#FFE11A",
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold"
    },
    textSm: {
        color: "whitesmoke",
        fontSize: 20,
        fontStyle: "italic",
        textAlign: "center",
    },
    formInput: {
        width: "100%",
        fontSize: 18,
        padding: 2,
        marginVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        color: "white",
        textDecorationLine: "none",
        textDecorationColor: "rgba(0,0,0,0)",
    }
});

export default SignIn;
