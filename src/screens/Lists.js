import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Context as ListContext } from "../context/ListContext";
import SafeViewAndroid from "../util/SafeViewAndroid";
import { LinearGradient } from "expo-linear-gradient";
import EmptyListScreen from "./EmptyListScreen";
import shopperApi from "../api/shopper";

const Lists = ({ navigation }) => {
  const {
    startLoading,
    stopLoading,
    state: { loading },
  } = useContext(ListContext);

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
            <FlatList
              data={lists}
              renderItem={renderItem}
              keyExtractor={(list) => list._id}
            />
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
  list: {
    // width: "100%",
  },
  listItem: {
    padding: 16,
    borderColor: "#FFE11A",
    borderWidth: 2,
    marginVertical: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  listTitle: {
    color: "#FFE11A",
    flex: 1,
  },
});

export default Lists;
