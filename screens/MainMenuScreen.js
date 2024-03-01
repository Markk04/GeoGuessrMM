import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const MainMenuScreen = ({ navigation }) => {
    const handleStartGame = () => {
        // Navegar a la pantalla del juego
        navigation.navigate('Game');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GeoGuessr</Text>
            <Button title="Comenzar partida" onPress={handleStartGame} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Alinea los elementos al principio del contenedor
        alignItems: 'center',
        paddingTop: 50, // Espacio superior para el título
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#007bff', // Color azul
        marginBottom: 20,
    },
});

export default MainMenuScreen;
