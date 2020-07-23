import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SignUp = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <LinearGradient colors={["#7f00ff", "#e100ff"]} style={styles.background}>
            <View style={styles.top}>
                <Text style={styles.text}>Nice to meet you!</Text>
                <Text style={styles.textSm}>Just pick a username and password so we can begin!</Text>
            </View>
            <View style={styles.center}>
                
                <Input value={username} onChangeText={setUsername} placeholderTextColor="white" placeholder="Username" leftIcon={
                    <Entypo name="price-tag" size={24} color="white"/>
                } ></Input>
                <Input value={password} onChangeText={setPassword} secureTextEntry={true} textContentType="password" placeholderTextColor="white" placeholder="Password" leftIcon={
                    <Entypo name="unlock" size={42} color="white"/>
                } ></Input>
                <Button
                    type="clear"
                    icon={<AntDesign name="plussquareo" size={56} color="yellow" />}
                />
            </View>
            {/* <View style={styles.center}>
                <Text h3 style={{ textAlign: "center", margin: 16, color: "rgba(255, 255, 255, 1)" }}>
                    Looks like you have no lists!
        </Text>
                <Text h4 style={{ textAlign: "center", fontSize: 4, margin: 16, fontStyle: "italic", color: "rgba(255, 255, 255, 1)" }}>
                    Create one right now, or join your friend's list.
        </Text>
                <Button
                    type="clear"
                    icon={<AntDesign name="plussquareo" size={56} color="yellow" />}
                    onPress={() => navigate("ListCreateScreen")}
                />
            </View> */}
        </LinearGradient>
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
        padding: 16
    },
    text: {
        // color: "rgba(0, 0, 0, 0.6)",
        // color: "rgba(255, 255, 255, 1)",
        color: "yellow",
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
        color: "whitesmoke"
    },
});

export default SignUp;
