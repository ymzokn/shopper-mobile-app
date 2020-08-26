import React, { useState, useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput as Input, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import SafeViewAndroid from "../util/SafeViewAndroid";
import { LinearGradient } from "expo-linear-gradient";
import { Context as ListContext } from "../context/ListContext"



const CreateListScreen = () => {
    const { createList, state } = useContext(ListContext)
    const [name, setName] = useState("")

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <LinearGradient colors={["#7f00ff", "#e100ff"]} style={styles.background}>
                <View style={styles.center}>
                    <Input onChangeText={setName} value={name} style={styles.formInput} placeholder="List Name" placeholderTextColor="white" autoCorrect={false} autoCorrect={false} autoCapitalize="none" />
                    <Button
                        onPress={() => createList({ name })} title="Create" buttonStyle={{ marginTop: 8, backgroundColor: "#FFE11A" }} titleStyle={{ paddingHorizontal: 16, color: "#7f00ff" }}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
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
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
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
})

export default CreateListScreen;
