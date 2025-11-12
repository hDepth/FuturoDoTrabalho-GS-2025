import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../styles/Colors";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.backgroundDark,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.title,
    textAlign: "center",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.caption,
    textAlign: "center",
    color: Colors.textSecondary,
    width: "85%",
  },
  form: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    padding: Spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.backgroundDark,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    color: Colors.text,
    padding: 12,
    marginBottom: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    textAlign: "center",
    color: Colors.textSecondary,
  },
  linkHighlight: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
