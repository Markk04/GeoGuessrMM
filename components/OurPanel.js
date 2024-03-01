import React from 'react';
import { Button, View, Text } from 'react-native';

function OurPanel({ title, subtitle }) {

    return (
        <View style={{ backgroundColor: "#FF00F1", width: '80%'}}>
            <Text>{title}</Text>
            <Text>{subtitle}</Text>
            
            {/* Contenedor para alinear los botones en el centro */}
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Botón 1</Text>
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Botón 2</Text>
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Botón 3</Text>
            </View>
        </View>
    );
}

export default OurPanel;
