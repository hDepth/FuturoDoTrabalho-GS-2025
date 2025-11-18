import { StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardLight,
    backgroundColor: Colors.backgroundDark,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Typography.lg,
    fontWeight: "700",
    color: Colors.primary,
    marginRight: 28,
  },

  scrollContainer: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },

  submissionCard: {
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  submissionTitle: {
    fontSize: Typography.md,
    fontWeight: "600",
    color: Colors.textDark,
  },

  submissionMeta: {
    fontSize: Typography.sm,
    color: Colors.textGray,
  },

  statusText: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: "800",
  },

  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 6,
  },

  evidenceImage: {
    width: "100%",
    height: 210,
    borderRadius: 16,
    backgroundColor: Colors.backgroundDark,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  approveButton: {
    flex: 1,
    backgroundColor: Colors.success,
    paddingVertical: Spacing.md,
    borderRadius: 14,
    alignItems: "center",
  },

  rejectButton: {
    flex: 1,
    backgroundColor: Colors.error,
    paddingVertical: Spacing.md,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: Typography.md,
  },
});
