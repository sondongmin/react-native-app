import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import Colors from '../constants/colors';
import Header from '../components/Header';
import Wrapper from '../components/Wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { generate, showEdit, edit, select } from '../redux/reducers/lotto';

const MainScreen = () => {

    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const dispatchGenerate = () => dispatch(generate());
    const dispatchSelect = (index) => dispatch(select(index));
    const dispatchShowEdit = () => dispatch(showEdit());
    const dispatchEdit = (number) => {
        if (store.lotto.show) {
            setNumber('');
        }
        dispatch(edit(number));
    }
    const [number, setNumber] = useState('');

    return (
        <Wrapper>
            <Header title="Number Picker" />
            <View style={styles.mainContainer}>
                {store.lotto.picks && Array.isArray(store.lotto.picks) ? <View style={styles.numberContainer}>
                    {store.lotto.picks.map(function(value, index) {
                        return (
                            <TouchableOpacity key={index} onPress={() => {dispatchSelect(index)}} >
                                <View style={
                                    (index !== store.lotto.selected) ? [styles.circle, styles.default] :
                                    [styles.circle, styles.selected]
                                }>
                                    <Text style={styles.number}>
                                        {value}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View> : <Text style={styles.message}>Press generate to generate numbers</Text>}
                {store.lotto.show ?  <Input
                    errorStyle={{ color: 'red' }}
                    errorMessage={store.lotto.error ? 'Must be a unique number between 1 and 49' : null}
                    value={number}
                    onChange={e => setNumber(e.nativeEvent.text)}
                /> : null }
                <View style={styles.buttonContainer}>
                    <View><Button buttonStyle={styles.button} title="Generate" onPress={() => {dispatchGenerate()}} /></View>
                    {store.lotto.show ?  
                        <View><Icon style={styles.icon} reverse name="edit" onPress={() => {dispatchEdit(number)}} color={Colors.secondary} /></View>
                        : <View><Icon style={styles.icon} reverse name="edit" onPress={() => {dispatchShowEdit()}} color={Colors.primary} /></View>
                    }
                </View>
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    message: {
        height: 38
    },
    numberContainer: {
        flexDirection: 'row'
    },
    circle: {
        borderRadius: 50,
        width: 30,
        height: 30,
        margin: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        backgroundColor: Colors.secondary
    },
    default: {
        backgroundColor: Colors.primary
    },
    number: {
        color: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        width: 250,
        height: 70,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button : {
        backgroundColor: Colors.primary,
        width: 100,
        height: 40,
        margin: 13
    },
    icon: {
        width: 60,
        height: 60,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MainScreen;