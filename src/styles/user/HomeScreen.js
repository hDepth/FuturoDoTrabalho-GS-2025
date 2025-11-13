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
  title: {
    ...Typography.title,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.caption,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  statBox: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    width: "30%",
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  statText: {
    ...Typography.body,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
  cardWrapper: {
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 14,
    padding: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
  },
  cardContent: {
    ...Typography.caption,
  },
});
