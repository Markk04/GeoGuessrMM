import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const FinalResultScreen = ({ route }) => {
    const { distanceToBarcelona, score, randomMarkerCoords } = route.params;
    const navigation = useNavigation(); // Obtiene el objeto de navegación

    // Coordenadas de Barcelona
    const barcelonaCoords = {
        latitude: 41.387920,
        longitude: 2.169920,
    };

    // Calcula la región inicial del mapa para que contenga ambos marcadores
    const region = {
        latitude: (randomMarkerCoords.latitude + barcelonaCoords.latitude) / 2,
        longitude: (randomMarkerCoords.longitude + barcelonaCoords.longitude) / 2,
        latitudeDelta: Math.abs(randomMarkerCoords.latitude - barcelonaCoords.latitude) * 2,
        longitudeDelta: Math.abs(randomMarkerCoords.longitude - barcelonaCoords.longitude) * 2,
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Distancia a Barcelona: {distanceToBarcelona.toFixed(0)} metros</Text>
                <Text style={styles.infoText}>Puntuación: {Math.round(score)}</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={region}
                    scrollEnabled={false} // Deshabilita el desplazamiento del mapa
                >
                    <Marker coordinate={barcelonaCoords} title="Barcelona" />
                    <Marker coordinate={randomMarkerCoords} title="Tu marcador" />
                    <Polyline
                        coordinates={[randomMarkerCoords, barcelonaCoords]}
                        strokeWidth={2}
                        strokeColor="blue"
                    />
                </MapView>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Volver al Menú Principal" onPress={() => navigation.navigate('MainMenu')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mapContainer: {
        width: '90%',
        height: 300,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default FinalResultScreen;
