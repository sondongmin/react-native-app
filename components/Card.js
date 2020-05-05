import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Card = (props) => {
    return (
        <View style={[styles.card, props.style]}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        elevation: 8,
        backgroundColor: Colors.white,
        padding: 20,
        margin: 10,
        borderRadius: 2
    }
});

export default Card;
