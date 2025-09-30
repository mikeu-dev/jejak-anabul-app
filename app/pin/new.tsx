import { db } from "@/FirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import MapRoot, { MapRootProps } from "@/components/map/map-root";
import ImagePickerComponent from "@/components/form/image-picker";

type CatForm = {
  name: string;
  breed: string;
  type: string;
  gender: string;
  imageUrl: string;
  locationText: string;
  location: MapRootProps["coordinates"] | null;
};

export default function NewPinScreen() {
  const [form, setForm] = useState<CatForm>({
    name: "",
    breed: "",
    type: "",
    gender: "",
    imageUrl: "",
    locationText: "",
    location: null,
  });

  const updateForm = (key: keyof CatForm, value: string | MapRootProps["coordinates"] | null) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const getLocation = async (): Promise<MapRootProps["coordinates"] | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Izin lokasi ditolak!");
        return null;
      }
      const location = await Location.getCurrentPositionAsync({});
      return { latitude: location.coords.latitude, longitude: location.coords.longitude };
    } catch (error) {
      console.error("Error get location:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const userLocation = await getLocation();
    if (!userLocation) return;
    updateForm("location", userLocation);

    // Validasi sederhana
    if (!form.name || !form.gender || !form.imageUrl) {
      Alert.alert("Form belum lengkap!");
      return;
    }

    try {
      await addDoc(collection(db, "cats"), {
        name: form.name,
        breed: form.breed,
        type: form.type,
        gender: form.gender,
        imageUrl: form.imageUrl,
        location: userLocation,
        locationText: form.locationText,
        createdAt: serverTimestamp(),
      });
      Alert.alert("Pin berhasil ditambahkan!");
      resetForm();
    } catch (error) {
      console.error("Error add pin:", error);
      Alert.alert("Gagal menyimpan pin.");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      breed: "",
      type: "",
      gender: "",
      imageUrl: "",
      locationText: "",
      location: null,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Tambah Pin Baru 🐱</Text>

      <ImagePickerComponent onPick={(uri) => updateForm("imageUrl", uri)} initialImage={form.imageUrl} />

      <TextInput
        placeholder="Nama kucing"
        value={form.name}
        onChangeText={(text) => updateForm("name", text)}
        style={styles.input}
      />

      <Picker
        selectedValue={form.gender}
        onValueChange={(value) => updateForm("gender", value)}
        style={styles.input}
      >
        <Picker.Item label="Pilih jenis kelamin" value="" />
        <Picker.Item label="Jantan" value="jantan" />
        <Picker.Item label="Betina" value="betina" />
      </Picker>

      <TextInput
        placeholder="Jenis"
        value={form.type}
        onChangeText={(text) => updateForm("type", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Keturunan"
        value={form.breed}
        onChangeText={(text) => updateForm("breed", text)}
        style={styles.input}
      />

      <MapRoot coordinates={form.location ?? undefined} />

      <TextInput
        placeholder="Alamat"
        value={form.locationText}
        onChangeText={(text) => updateForm("locationText", text)}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
