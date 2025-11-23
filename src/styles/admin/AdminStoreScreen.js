import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../styles/Colors";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...Typography.subtitle,
    color: Colors.text,
    fontWeight: "700",
  },
  createBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  createBtnText: {
    color: Colors.text,
    fontWeight: "700",
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 120,
  },
  itemCard: {
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
  itemInfo: {
    flexDirection: "row",
    flex: 1,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: Colors.grey,
  },
  itemName: {
    ...Typography.subtitle,
    color: Colors.text,
  },
  itemDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  itemMeta: {
    ...Typography.body,
    marginTop: 6,
    color: Colors.secondary,
    fontWeight: "700",
  },
  actions: {
    justifyContent: "center",
    marginLeft: 12,
  },
  iconBtn: {
    padding: 8,
  },
  rewardsBtn: {
    width: "100%",
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  rewardsBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  rewardsBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
