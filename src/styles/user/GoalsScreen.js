import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  headerIcon: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: Spacing.md,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.lg,
  },
  tabButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
    backgroundColor: Colors.backgroundLight,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
    fontWeight: "bold",
  },
  activeTabIndicator: {
    height: 3,
    width: "60%",
    backgroundColor: Colors.secondary,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: Spacing.xs,
  },
  listContainer: {
    paddingBottom: 80,
  },
  goalCard: {
    flex: 1,
    margin: Spacing.sm,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  gemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: Spacing.sm,
  },
  goalCardTitle: {
    ...Typography.subtitle,
    textAlign: "center",
  },

  // reused from admin modal with slight tweaks
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.backgroundLight,
    width: "92%",
    borderRadius: 18,
    padding: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 12,
  },
  modalTitle: {
    ...Typography.title,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  input: {
    backgroundColor: Colors.backgroundDark,
    color: Colors.text,
    borderRadius: 10,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 15,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderDark,
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

  // floating history button
  floatingHistoryButton: {
    position: "absolute",
    right: 20,
    bottom: 28,
    backgroundColor: Colors.primary,
    width: 54,
    height: 54,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 12,
  },

  // reuse visual styles for goalTitle / date in lists
  goalTitle: {
    ...Typography.subtitle,
    color: Colors.text,
  },
  goalDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
