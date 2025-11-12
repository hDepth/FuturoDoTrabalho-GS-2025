import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollContainer: {
    alignItems: "center",
    padding: Spacing.lg,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  highlight: {
    color: Colors.primary,
    fontWeight: "bold",
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
});
