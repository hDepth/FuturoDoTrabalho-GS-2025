import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0e0e0e",
  },

  container: {
    padding: 22,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },

  description: {
    fontSize: 16,
    color: "#cfcfcf",
    lineHeight: 24,
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#1a1a1a",
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#2b2b2b",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    fontSize: 15,
    color: "#aaaaaa",
  },

  value: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "600",
    maxWidth: "55%",
    textAlign: "right",
  },

  footer: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 14,
  },
});
