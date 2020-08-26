import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from "react-native-elements";
import * as RootNavigation from "../../RootNavigation"

const EmptyListScreen = () => {
    return (
        <View style={{ position: "relative", flex: 1 }} >
            <LinearGradient colors={["#7f00ff", "#e100ff"]} style={styles.background}>
                <View style={styles.top}>
                    <Text style={styles.text}>Looks like you have no lists!</Text>
                    <Text style={styles.textSm}>Start by creating a list, or get invited to another one!</Text>
                </View>
                <View style={styles.center}>
                    <Button buttonStyle={{ backgroundColor: "transparent", padding: 12 }} titleStyle={{ fontFamily: "serif", marginLeft: 8, color: "#FFE11A" }} title="Create" icon={
                        <Entypo name="plus" size={42} color="#FFE11A" />
                    } onPress={() => RootNavigation.navigate("CreateListScreen")}></Button>
                    <Button buttonStyle={{ backgroundColor: "transparent", padding: 12 }} titleStyle={{ fontFamily: "serif", marginLeft: 8, color: "#FFE11A" }} title="Join" icon={
                        <MaterialIcons name="group" size={42} color="#FFE11A" />
                    }></Button>
                </View>
            </LinearGradient>
        </View>
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
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 16
    },
    center: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
    },
    text: {
        fontFamily: "serif",
        // color: "rgba(0, 0, 0, 0.6)",
        // color: "rgba(255, 255, 255, 1)",
        color: "#FFE11A",
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold"
    },
    textSm: {
        margin: 8,
        color: "whitesmoke",
        fontSize: 18,
        letterSpacing: 1.3,
        // fontStyle: "italic",
        textAlign: "center",
    },
});

export default EmptyListScreen;
