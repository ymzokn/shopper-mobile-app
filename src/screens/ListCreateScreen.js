import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

const ListCreateScreen = () => {
    return (
        <LinearGradient colors={["#7f00ff", "#e100ff"]} style={styles.background}>
            <View style={styles.center}>
                <Text>List Create Screen</Text>
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
});

export default ListCreateScreen;
