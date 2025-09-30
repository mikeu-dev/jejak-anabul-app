import { useEffect, useState, useRef } from "react";
import { MapRootProps } from "@/components/map/map-root";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker, Callout, LatLng } from "react-native-maps";
import { db } from "@/FirebaseConfig";
import { collection, GeoPoint, getDocs, orderBy, query } from "firebase/firestore";

type CatCollection = {
    id: string;
    name: string;
    breed: string;
    type: string;
    gender: string;
    imageUrl: string;
    locationText: string;
    location: { latitude: number; longitude: number } | null;
};

export default function MapScreen() {
    const [cats, setCats] = useState<CatCollection[]>([]);
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const catsCollection = collection(db, 'cats');
                const q = query(catsCollection, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => {
                    const d = doc.data();
                    let location = null;

                    if (d.location && typeof d.location.latitude === "number" && typeof d.location.longitude === "number") {
                        location = {
                            latitude: d.location.latitude,
                            longitude: d.location.longitude,
                        };
                    }

                    return {
                        id: doc.id,
                        name: d.name,
                        gender: d.gender,
                        type: d.type,
                        breed: d.breed,
                        imageUrl: d.imageUrl,
                        locationText: d.locationText,
                        location,
                    } as CatCollection;
                });

                setCats(data);
            } catch (error) {
                console.error("Error fetching cats:", error);
            }
        };

        fetchCats();
    }, []);

    // Fit map ke semua marker setelah cats berubah
    // useEffect(() => {
    //     if (mapRef.current && cats.length > 0) {
    //         const coordinates: LatLng[] = cats
    //             .filter(cat => cat.location)
    //             .map(cat => cat.location as LatLng);

    //         if (coordinates.length > 0) {
    //             mapRef.current.fitToCoordinates(coordinates, {
    //                 edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
    //                 animated: true,
    //             });
    //         }
    //     }
    // }, [cats]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: -6.5697,   // default tengah Indonesia
                    longitude: 107.4439,
                    latitudeDelta: 5.5,
                    longitudeDelta: 5.5,
                }}
            >
                {cats.map((cat) =>
                    cat.location ? (
                        <Marker
                            key={cat.id}
                            coordinate={cat.location}
                            title={cat.name}
                        >
                            <Callout>
                                <View style={{ width: 220 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{cat.name}</Text>
                                    <Text>Jenis: {cat.type}</Text>
                                    <Text>Keturunan: {cat.breed}</Text>
                                    <Text>Jenis Kelamin: {cat.gender}</Text>
                                    <Text>Lokasi: {cat.locationText}</Text>
                                    {cat.imageUrl ? (
                                        <Image
                                            source={{ uri: cat.imageUrl }}
                                            style={{ width: "100%", height: 100, marginTop: 5, borderRadius: 8 }}
                                            resizeMode="cover"
                                        />
                                    ) : null}
                                </View>
                            </Callout>
                        </Marker>
                    ) : null
                )}
                {/* <Marker
                    key={25}
                    // coordinate={cat.location!}
                    // title={cat.name}
                    coordinate={{ latitude: -6.5697, longitude: 107.4439, }}
                    title="Test Marker"
                >
                </Marker> */}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
