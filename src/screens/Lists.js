import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Context as ListContext } from "../context/ListContext";
import { Context as AuthContext } from "../context/AuthContext";
import SafeViewAndroid from "../util/SafeViewAndroid";
import { LinearGradient } from "expo-linear-gradient";
import EmptyListScreen from "./EmptyListScreen";
import shopperApi from "../api/shopper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Lists = ({ navigation }) => {
  const {
    startLoading,
    stopLoading,
    state: { loading },
  } = useContext(ListContext);

  const { logout } = useContext(AuthContext);

  navigation.setOptions({
    // title: "My Lists",
    headerRight: () => (
      <TouchableOpacity onPress={() => logout()}>
        <MaterialCommunityIcons
          style={styles.listIcon}
          name="logout"
          size={32}
          color="black"
        />
      </TouchableOpacity>
    ),
  });

  const [lists, setLists] = useState([]);

  const getLists = async () => {
    startLoading();
    const response = await shopperApi.get("/lists");
    setLists(response.data);
    stopLoading();
  };

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      getLists();
    });

    return subscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate("ListDetailsScreen", { list: item })}
    >
      <Feather
        style={styles.listIcon}
        name="shopping-bag"
        size={24}
        color="black"
      />
      <Text style={styles.listTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <LinearGradient
          colors={["#7f00ff", "#e100ff"]}
          style={styles.background}
        >
          {loading ? (
            <ActivityIndicator
              style={{ flex: 1, justifyContent: "center" }}
              color="white"
              size="large"
            />
          ) : lists.length ? (
            <>
              <View style={styles.centered}>
                <TouchableOpacity
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("CreateListScreen");
                  }}
                >
                  <AntDesign name="plussquare" size={64} color="#7f00ff" />
                  <Text style={styles.newListText}>New List</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={lists}
                renderItem={renderItem}
                keyExtractor={(list) => list._id}
              />
            </>
          ) : (
            <EmptyListScreen />
          )}
        </LinearGradient>
      </SafeAreaView>
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
  centered: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  newListText: {
    color: "#7f00ff",
  },
  listItem: {
    paddingHorizontal: 4,
    paddingVertical: 16,
    backgroundColor: "white",
    display: "flex",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
  },
  listTitle: {
    letterSpacing: 1,
    fontSize: 18,
    flex: 1,
  },
  listIcon: {
    color: "#7f00ff",
    marginHorizontal: 8,
  },
});

export default Lists;
