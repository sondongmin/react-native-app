import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logo from '../assets/logo.png';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={Logo} />
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 100,
        width: 110,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },  
    headerTitle: {
        color: '#000',
        fontSize: 18,
        paddingBottom: 150,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Header;