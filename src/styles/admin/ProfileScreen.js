import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollContainer: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  name: {
    ...Typography.title,
    color: Colors.secondary,
    marginTop: Spacing.sm,
  },
  email: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: 12,
    width: "100%",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
  },
  sectionText: {
    ...Typography.caption,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 10,
    marginTop: Spacing.lg,
    width: "80%",
  },
  logoutText: {
    ...Typography.subtitle,
    color: Colors.text,
  },
});
