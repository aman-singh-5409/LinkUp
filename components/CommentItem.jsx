import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";
import Avatar from "./Avatar";
import { getUserImageSrc } from "../services/imageService";
import moment from "moment";
import Icon from "../assets/icons";

const CommentItem = ({ item, canDelete = false, onDelete = () => {},highlight = false }) => {
  const handleDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to do this?", [
      {
        text: "Cancel",
        onPress: () => console.log("modal cancelled"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete(item),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={[styles.container, highlight && styles.highlight]}>
      <Avatar uri={getUserImageSrc(item?.user?.image)} />

      <View style={[styles.content,highlight]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.nameContainer}>
            <Text style={styles.text}>{item?.user?.name}</Text>
            <Text>-</Text>
            <Text style={[styles.text, { color: theme.colors.textLight }]}>
              {moment(item?.created_at).format("MMM D")}
            </Text>
          </View>

          {canDelete && (
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="delete" color={theme.colors.rose} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={[styles.text, { fontWeight: "normal" }]}>
          {item?.text}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 7,
  },
  content: {
    backgroundColor: "rgba(0,0,0,0.06)",
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  highlight: {
    padding: 5,
    borderRadius: theme.radius.md,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  text: {
    fontSize: hp(1.6),
    fontWeight: theme.fonts.medium,
    colors: theme.colors.textDark,
  },
});
