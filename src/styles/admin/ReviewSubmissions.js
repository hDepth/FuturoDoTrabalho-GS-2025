import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollContainer: {
    padding: Spacing.lg,
    paddingBottom: 120,
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
    borderWidth: 1,
    borderColor: Colors.borderDark ?? "#23233a",
  },
  submissionTitle: {
    ...Typography.subtitle,
    color: Colors.text,
  },
  submissionMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: Spacing.sm,
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: Colors.success,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  rejectButton: {
    backgroundColor: Colors.error,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  buttonText: {
    ...Typography.subtitle,
    color: Colors.text,
  },
});
