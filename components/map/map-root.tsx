import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";

export type MapRootProps = {
  coordinates?: LatLng;
};

export default function MapRoot({ coordinates, ...rest }: MapRootProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: -6.9175,
          longitude: 107.6191,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        {...rest}
      >
        {coordinates && (
          <Marker
            coordinate={coordinates}
            title="Kucing Terakhir kali dilihat disekitar sini."
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
