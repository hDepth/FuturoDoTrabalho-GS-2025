import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../Colors';

const HomeStyles = StyleSheet.create({
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    borderRadius: 8,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...Typography.subtitle,
    marginLeft: Spacing.sm,
  },
  xpIcon: {
    color: Colors.secondary, // Verde
  },
  coinIcon: {
    color: '#FFD700', // Dourado
  },
  gemIcon: {
    color: Colors.gemPink, // Rosa
  },
  card: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.sm,
  },
  cardContent: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});

export default HomeStyles;