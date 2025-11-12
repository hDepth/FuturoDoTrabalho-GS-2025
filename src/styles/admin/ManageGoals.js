import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollContainer: {
    padding: Spacing.lg,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.md,
  },
  caption: {
    ...Typography.caption,
    marginBottom: Spacing.lg,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  addButtonText: {
    ...Typography.subtitle,
    color: Colors.text,
    marginLeft: 8,
  },
  goalCard: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: 12,
  },
  goalTitle: {
    ...Typography.subtitle,
  },
  goalDate: {
    ...Typography.caption,
  },
});
