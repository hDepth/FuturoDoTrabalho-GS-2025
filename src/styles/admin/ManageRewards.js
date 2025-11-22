import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../styles/Colors";

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: Colors.grey,
  },
  title: {
    ...Typography.subtitle,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 12,
  },
  status: {
    fontWeight: "700",
  },
  smallBtn: {
    marginTop: 8,
    alignItems: "center",
  },
  smallBtnText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});
