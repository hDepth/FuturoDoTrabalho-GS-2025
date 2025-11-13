import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollContainer: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.sm,
  },
  caption: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
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
    marginBottom: Spacing.md,
  },
  goalTitle: {
    ...Typography.subtitle,
    color: Colors.text,
  },
  goalDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.backgroundLight,
    width: "90%",
    borderRadius: 20,
    padding: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    ...Typography.title,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.backgroundDark,
    color: Colors.text,
    borderRadius: 10,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 15,
    marginBottom: Spacing.md,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.grey,
    paddingVertical: Spacing.md,
    borderRadius: 10,
    marginRight: 10,
  },
  cancelText: {
    textAlign: "center",
    color: Colors.text,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 10,
  },
  saveText: {
    textAlign: "center",
    color: Colors.text,
    fontWeight: "700",
  },
});
