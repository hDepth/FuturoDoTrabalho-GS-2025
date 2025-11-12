import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, Typography } from './Colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.md * 3) / 2; // 2 colunas com padding

const GoalsStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.title,
  },
  subtitle: {
    ...Typography.caption,
    maxWidth: '80%',
  },
  headerIcon: {
    width: 60,
    height: 60,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.md,
  },
  tabText: {
    ...Typography.subtitle,
    fontSize: 16,
    color: Colors.textSecondary,
    marginRight: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  tabTextActive: {
    color: Colors.text,
  },
  activeTabIndicator: {
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  listContainer: {
    alignItems: 'flex-start',
  },
  goalCard: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    margin: Spacing.sm / 2,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: Spacing.sm,
    // Sombra sutil para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImageBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.grey, // Placeholder para a imagem de fundo
    opacity: 0.3,
  },
  gemIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    transform: [{ rotate: '45deg' }],
  },
  goalCardTitle: {
    ...Typography.subtitle,
    fontSize: 16,
    // Adiciona uma sombra no texto para legibilidade
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default GoalsStyles;                                                     