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
  submissionCard: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },
  submissionTitle: {
    ...Typography.subtitle,
  },
  submissionMeta: {
    ...Typography.caption,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: Spacing.sm,
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: Colors.success,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: Colors.error,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    ...Typography.subtitle,
    color: Colors.text,
  },
});
