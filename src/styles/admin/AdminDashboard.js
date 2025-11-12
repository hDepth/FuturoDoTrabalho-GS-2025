import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollContainer: {
    padding: Spacing.lg,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    ...Typography.subtitle,
    marginTop: Spacing.sm,
  },
  cardText: {
    ...Typography.caption,
  },
});
