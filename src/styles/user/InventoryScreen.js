import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../Colors";

export default StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  backButton: {
    marginBottom: 6,
  },
  backText: {
    color: Colors.textSecondary,
  },
  headerTitle: {
    ...Typography.title,
    fontSize: 22,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  card: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  itemThumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: "cover",
  },
  placeholder: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 26,
  },

  itemTitle: {
    ...Typography.subtitle,
    fontSize: 16,
  },
  itemMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  cardFooter: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  status: {
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
    textTransform: "uppercase",
    color: Colors.text,
  },
  statusPending: {
    backgroundColor: "rgba(255,165,0,0.12)",
    color: Colors.primary,
  },
  statusDone: {
    backgroundColor: "rgba(57,230,0,0.12)",
    color: Colors.success,
  },

  small: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 6,
  },

  comprovante: {
    alignItems: "flex-end",
  },
  codeLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  codeBox: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  codeText: {
    color: Colors.text,
    fontWeight: "700",
  },

  empty: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    ...Typography.subtitle,
    marginBottom: 8,
  },
  emptyText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 16,
    textAlign: "center",
  },
  goStore: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  goStoreText: {
    color: Colors.text,
    fontWeight: "700",
  },
});
