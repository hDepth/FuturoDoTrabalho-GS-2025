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
});
