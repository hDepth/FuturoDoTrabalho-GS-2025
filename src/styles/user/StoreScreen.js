import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../Colors';

const StoreStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  storeHeader: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl + Spacing.lg, // Mais espaço para a imagem
    backgroundColor: Colors.backgroundLight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  headerImage: {
    width: 120,
    height: 120,
    backgroundColor: Colors.grey, // Placeholder
    borderRadius: 10,
    position: 'absolute',
    right: Spacing.md,
    bottom: -Spacing.lg, // Sobrepõe a lista
    transform: [{ rotate: '5deg' }],
  },
  title: {
    ...Typography.title,
    maxWidth: '70%',
  },
  subtitle: {
    ...Typography.caption,
    maxWidth: '65%',
    marginTop: Spacing.sm,
  },
  listContainer: {
    padding: Spacing.md,
    paddingTop: Spacing.xl, // Espaço para a imagem do header
  },
  itemCard: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  gemIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  itemPrice: {
    ...Typography.subtitle,
    color: Colors.secondary,
  },
  itemIcon: {
    width: 60,
    height: 60,
    backgroundColor: Colors.backgroundDark, // Fundo do ícone
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: Spacing.md,
  },
  itemTitle: {
    ...Typography.subtitle,
    textAlign: 'center',
  },
  itemDescription: {
    ...Typography.caption,
    textAlign: 'center',
    marginVertical: Spacing.sm,
  },
  buyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
  buyButtonText: {
    ...Typography.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StoreStyles;