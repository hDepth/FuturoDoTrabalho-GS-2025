import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from './Colors';

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  name: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: Colors.text,
    fontSize: 16,
    marginLeft: 10,
  },
});
