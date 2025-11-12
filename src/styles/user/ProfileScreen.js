import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../Colors';

const ProfileStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.text,
  },
  userName: {
    ...Typography.title,
  },
  userEmail: {
    ...Typography.caption,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.md,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  historyItemText: {
    ...Typography.body,
  },
  historyItemDate: {
    ...Typography.caption,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    ...Typography.body,
    fontWeight: 'bold',
  },
});

export default ProfileStyles;