import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { navigate } from "../../RootNavigation";

const SignUp = () => {
    return (
        <LinearGradient colors={["#7f00ff", "#e100ff"]} style={styles.background}>
            <View style={styles.center}>
                <Text h3 style={{ color: "rgba(255, 255, 255, 1)" }}>
                    Looks like you have no lists!
        </Text>
                <Text h4 style={{ color: "rgba(255, 255, 255, 1)" }}>
                    Create one right now, or join your friend's list.
        </Text>
                <Button
                    type="clear"
                    icon={<AntDesign name="plussquareo" size={56} color="yellow" />}
                    onPress={() => navigate("ListCreateScreen")}
                />
            </View>
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
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        // color: "rgba(0, 0, 0, 0.6)",
        color: "rgba(255, 255, 255, 1)",
        marginVertical: 4,
    },
});

export default SignUp;
