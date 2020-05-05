import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import Card from './Card';

const Wrapper = (props) => {
    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.screen}>
                    {props.children}
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 30,
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center'
    },
});

export default Wrapper;