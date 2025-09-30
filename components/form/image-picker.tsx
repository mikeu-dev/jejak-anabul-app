import { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type ImagePickerProps = {
  onPick: (uri: string) => void; // callback ke parent
  initialImage?: string; // opsional, bisa untuk edit
};

export default function ImagePickerComponent({ onPick, initialImage }: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Izin ditolak!', 'Tidak dapat mengakses galeri.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onPick(uri); // kirim ke parent
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pilih gambar dari galeri" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 15,
  },
});
