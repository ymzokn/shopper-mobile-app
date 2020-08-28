import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SafeViewAndroid from "../util/SafeViewAndroid";
import ItemForm from "./../components/ItemForm";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Context as ListContext } from "../context/ListContext";
import { AntDesign } from "@expo/vector-icons";
import Popup from "./../components/Popup";
import shopperApi from "../api/shopper";

const ListDetailsScreen = ({ route, navigation }) => {
  // const { list } = route.params;
  const listID = route.params.list._id;
  const {
    deleteList,
    updateList,
    startLoading,
    stopLoading,
    state,
  } = useContext(ListContext);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ name: "", quantity: "" });
  const [list, setList] = useState({});
  navigation.setOptions({
    title: list.name,
    headerRight: () => (
      <TouchableOpacity onPress={() => deleteList(list)}>
        <MaterialIcons
          style={styles.listIcon}
          name="delete-forever"
          size={32}
          color="black"
        />
      </TouchableOpacity>
    ),
  });
  useEffect(() => {
    refreshItems();
  }, []);

  const refreshItems = async () => {
    startLoading();
    const response = await shopperApi.get("/lists/" + listID);
    setList(response.data);
    stopLoading();
  };

  const handleSave = async (name, quantity) => {
    startLoading();
    const newList = { ...list, items: [...list.items, { name, quantity }] };
    await updateList(newList);
    setList(newList);
    setOverlayOpen(false);
    stopLoading();
  };

  const handleEdit = async (name, quantity) => {
    startLoading();
    const newItems = list.items.map((elem) => {
      if (elem._id === selectedItem._id) {
        return { ...elem, name, quantity };
      } else {
        return elem;
      }
    });
    const newList = { ...list, items: newItems };
    await updateList(newList);
    setList(newList);
    setOverlayOpen(false);
    stopLoading();
  };

  const deleteItem = async (item) => {
    startLoading();
    const newItems = list.items.filter((elem) => {
      return elem._id !== item._id;
    });
    const newList = { ...list, items: newItems };
    await updateList(newList);
    setList(newList);
    stopLoading();
  };

  const renderItem = ({ item }) => (
    <>
      <View style={styles.itemRow}>
        <Text style={styles.itemName}>{item.name}:</Text>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.itemAction}
          onPress={() => {
            setSelectedItem(item);
            setOverlayOpen(true);
          }}
        >
          <Entypo name="edit" size={16} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemAction}
          onPress={() => deleteItem(item)}
        >
          <Entypo name="cross" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );

  const { items } = list;
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <LinearGradient colors={["#7f00ff", "#e100ff"]} style={styles.background}>
        {state.loading ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center" }}
            color="white"
            size="large"
          />
        ) : (
          <View style={styles.centered}>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setSelectedItem({ name: "", quantity: "" });
                setOverlayOpen(true);
              }}
            >
              <AntDesign name="plussquare" size={64} color="#FFE11A" />
              <Text style={styles.listTitle}>Add Item</Text>
            </TouchableOpacity>
          </View>
        )}

        {items && !state.loading && (
          <>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
            />
          </>
        )}
      </LinearGradient>
      <Popup
        isVisible={overlayOpen}
        onBackdropPress={() => setOverlayOpen(!overlayOpen)}
      >
        <ItemForm
          onSave={selectedItem.name ? handleEdit : handleSave}
          selectedItem={selectedItem}
        />
      </Popup>
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
  centered: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 18,
    color: "white",
  },
  listIcon: {
    // borderRadius: "50%",
    borderWidth: 2,
    margin: 8,
    borderColor: "white",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginHorizontal: 16,
    padding: 8,
    backgroundColor: "white",
  },
  itemName: {
    fontSize: 18,
    flex: 1,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 18,
    flex: 1,
  },
  itemAction: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
  },
});

export default ListDetailsScreen;
