import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from './Colors';

const AboutStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.lg,
  },
  text: {
    ...Typography.body,
    marginBottom: Spacing.md,
  },
  infoBox: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: 8,
    marginTop: Spacing.md,
  },
  infoLabel: {
    ...Typography.caption,
  },
  infoValue: {
    ...Typography.body,
    fontWeight: 'bold',
  },
});

export default AboutStyles;