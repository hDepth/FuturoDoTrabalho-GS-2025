import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  avatarBorder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    padding: 3,
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
  },
  userName: {
    ...Typography.title,
    textAlign: "center",
  },
  userEmail: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  levelCard: {
    width: "100%",
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    padding: Spacing.md,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: Spacing.lg,
  },
  levelText: {
    ...Typography.subtitle,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  xpText: {
    ...Typography.caption,
    textAlign: "center",
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    marginHorizontal: 6,
    paddingVertical: Spacing.md,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    color: Colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    ...Typography.caption,
    textAlign: "center",
  },
  badgeContainer: {
    width: "100%",
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.subtitle,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  badgeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badgeItem: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.backgroundDark,
    width: 90,
  },
  badgeIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  badgeText: {
    ...Typography.caption,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: Spacing.md,
    shadowColor: Colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    ...Typography.subtitle,
    color: Colors.text,
  },
});
