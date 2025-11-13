import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  storeHeader: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  title: {
    ...Typography.title,
    textAlign: "center",
  },
  subtitle: {
    ...Typography.caption,
    textAlign: "center",
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
  },
  headerImage: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: 50,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },
  itemCard: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 18,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  gemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  itemPrice: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  itemIcon: {
    alignItems: "center",
    marginVertical: Spacing.sm,
  },
  itemTitle: {
    ...Typography.subtitle,
    textAlign: "center",
    marginTop: Spacing.sm,
  },
  itemDescription: {
    ...Typography.caption,
    textAlign: "center",
    marginVertical: Spacing.sm,
  },
  buyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  buyButtonText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
});
