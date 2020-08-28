import React, { useState } from "react";
import {
  View,
  Text,
  TextInput as Input,
  StyleSheet,
  Button,
} from "react-native";

const ItemForm = ({ selectedItem, onSave }) => {
  const [itemName, setItemName] = useState(selectedItem.name);
  const [itemQuantity, setItemQuantity] = useState(selectedItem.quantity);
  return (
    <View style={styles.formWrapper}>
      <Input
        onChangeText={setItemName}
        value={itemName}
        style={styles.formInput}
        placeholder="Name"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        onChangeText={setItemQuantity}
        value={itemQuantity}
        style={styles.formInput}
        placeholder="Quantity"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button
        onPress={() => onSave(itemName, itemQuantity)}
        title="Save"
        buttonStyle={{ marginTop: 8, backgroundColor: "#FFE11A" }}
        titleStyle={{ paddingHorizontal: 32, color: "#7f00ff" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formInput: {
    width: 300,
    fontSize: 18,
    padding: 2,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    // color: "white",
    textDecorationLine: "none",
    textDecorationColor: "rgba(0,0,0,0)",
  },
});

export default ItemForm;
