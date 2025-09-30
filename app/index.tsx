import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jejak Anabul 🐾</Text>
      <Text style={styles.subtitle}>
        Tandai lokasi terakhir kamu melihat kucing.
      </Text>

      <Link href="/map" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lihat Peta</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/pin/new" asChild>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#f59e0b" }]}>
          <Text style={styles.buttonText}>Tambah Pin Baru</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 30, textAlign: "center" },
  button: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
