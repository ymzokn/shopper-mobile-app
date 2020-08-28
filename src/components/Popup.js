import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Popup = ({ isVisible, children, onBackdropPress }) => {
  return (
    isVisible && (
      <View style={styles.popupWrapper}>
        <TouchableOpacity
          style={styles.centered}
          onPress={onBackdropPress}
        ></TouchableOpacity>
        <View style={styles.popupContent}>{children}</View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  popupWrapper: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    elevation: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    width: "80%",
    height: "80%",
    marginLeft: "10%",
    marginBottom: "10%",
    zIndex: 99,
    elevation: 99,
    backgroundColor: "white",
  },
});

export default Popup;
