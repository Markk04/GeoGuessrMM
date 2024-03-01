import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const GameScreen = ({ navigation }) => {
    const [randomMarkerCoords, setRandomMarkerCoords] = useState(null);
    const [barcelonaCoords] = useState({
        latitude: 41.387920,
        longitude: 2.169920,
    });
    const [showMarkers, setShowMarkers] = useState(false);
    const [locationInfo, setLocationInfo] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [markPressed, setMarkPressed] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [mapScrollEnabled, setMapScrollEnabled] = useState(true); // Estado para habilitar/deshabilitar desplazamiento del mapa

    useEffect(() => {
        let timer;
        if (timeLeft !== null && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleCheckPress();
        }
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleMarkPress = () => {
        setShowMarkers(false);
        setLocationInfo(null);
        if (!timerStarted) {
            setTimeLeft(60);
            setTimerStarted(true);
        }
        setMarkPressed(true); 
        setMapScrollEnabled(true); // Habilitar el desplazamiento del mapa
    };

    const handleMapPress = (event) => {
        if (markPressed) { // Permitir la marcación solo si se ha presionado "Mark"
            const { coordinate } = event.nativeEvent;
            setRandomMarkerCoords(coordinate);
        }
    };

    const handleCheckPress = () => {
        setShowMarkers(true);
        if (randomMarkerCoords) {
            const distance = calculateDistance(randomMarkerCoords, barcelonaCoords);
            const score = calculateScore(distance);
            setLocationInfo(`Distancia a Barcelona: ${distance.toFixed(2)} metros. Puntuación: ${score}`);
            navigation.navigate('FinalResult', { 
                distanceToBarcelona: distance,
                score,
                randomMarkerCoords
            });
            
        }
    };
    
    const calculateDistance = (coord1, coord2) => {
        const R = 6371; // Radio de la Tierra en kilómetros
        const lat1 = coord1.latitude;
        const lon1 = coord1.longitude;
        const lat2 = coord2.latitude;
        const lon2 = coord2.longitude;

        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 1000; // Convertir a metros
        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const calculateScore = (distance) => {
        const MAX_DISTANCE = 20000000; // Ajusta esto según tus necesidades
        const MAX_POINTS = 1000;
    
        // Invertir la distancia: mientras más cerca, mayor puntuación
        const invertedDistance = MAX_DISTANCE - distance;
    
        // Escalar la puntuación para que esté en el rango de 0 a 1000
        const scaledScore = (invertedDistance / MAX_DISTANCE) * MAX_POINTS;
    
        // Asegurarse de que la puntuación esté en el rango de 0 a 1000
        return Math.max(0, Math.min(MAX_POINTS, scaledScore));
    };
    return (
        <View style={styles.container}>
            {/* Componente para bloquear el mapa */}
            {!markPressed && (
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={null} />
            )}

            <View style={styles.buttonContainer}>
                <Button title="Mark" onPress={handleMarkPress} style={styles.button} />
                <View style={styles.separator}></View>
                <Button title="Check" onPress={handleCheckPress} style={styles.button} disabled={!randomMarkerCoords} 
/>
            </View>
            <View style={styles.space}></View>
            <MapView
                style={styles.map}
                initialRegion={{ latitude: 0, longitude: 0, latitudeDelta: 30, longitudeDelta: 30 }}
                onPress={handleMapPress}
                scrollEnabled={mapScrollEnabled} // Utilizar estado para habilitar/deshabilitar desplazamiento del mapa
            >
                {randomMarkerCoords && !showMarkers && (
                    <Marker coordinate={randomMarkerCoords} title="Has marcado" />
                )}
                {showMarkers && (
                    <Marker coordinate={barcelonaCoords} title="Barcelona" />
                )}
                {showMarkers && randomMarkerCoords && (
                    <Polyline
                        coordinates={[randomMarkerCoords, barcelonaCoords]}
                        strokeWidth={2}
                        strokeColor="blue"
                    />
                )}
            </MapView>

            <Text style={styles.findText}>Donde esta Barcelona?</Text>
            {locationInfo && <Text style={styles.locationText}>{locationInfo}</Text>}
            {timeLeft !== null && <Text style={styles.timerText}>Tiempo restante: {timeLeft} segundos</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2, // Asegura que los botones estén encima del overlay
    },
    button: {
        marginHorizontal: 5,
    },
    separator: {
        width: 10,
    },
    space: {
        height: 20,
    },
    map: {
        width: '85%',
        height: '55%',
        zIndex: 0, // Asegura que el mapa esté detrás del overlay
    },
    findText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationText: {
        marginTop: 10,
        fontSize: 16,
    },
    timerText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GameScreen;
