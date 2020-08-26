import React, { useContext } from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SafeViewAndroid from "../util/SafeViewAndroid";
import { LinearGradient } from "expo-linear-gradient";
import { Context as ListContext } from "../context/ListContext"

const ListDetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const { deleteList } = useContext(ListContext)

    navigation.setOptions({
        title: item.name,
        headerRight: () => (
            <TouchableOpacity onPress={() => deleteList(item)}>
                <MaterialIcons
                    style={styles.listIcon}
                    name="delete-forever"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
        ),
    });
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <LinearGradient
                colors={["#7f00ff", "#e100ff"]}
                style={styles.background}
            ></LinearGradient>
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
    listTitle: {
        flex: 1,
        fontSize: 18,
        color: "white",
        margin: 8,
    },
    listIcon: {
        // borderRadius: "50%",
        borderWidth: 2,
        margin: 8,
        borderColor: "white",
    },
});

export default ListDetailsScreen;
