import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import Colors from '../constants/colors';
import Header from '../components/Header';
import Wrapper from '../components/Wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { remove, showAdd, add } from '../redux/reducers/list';

const ListScreen = () => {
    
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const dispatchRemove = (index) => dispatch(remove(index));
    const dispatchShowAdd = () => dispatch(showAdd());
    const dispatchAdd = (numbers) => {
        if (store.list.show) {
            setNumbers('');
        }
        dispatch(add(numbers));
    }
    const [numbers, setNumbers] = useState('');
    const setNumbersWrapper = (value) => {
        let final = value.replace(/\D/g,' ');
        setNumbers(final);
    }

    return (
        <Wrapper>
            <Header title="Ban List" />
            <View style={styles.mainContainer} >
                {store.list.list && store.list.list.length > 0 ? <View>
                {store.list.list.map(function(element, index){
                    return (
                        <View key={`ban_wrapper${index}`} style={styles.numberContainer}>
                            {element.map(function(number){
                                return(
                                    <View key={`ban_${number}`} style={
                                        [styles.circle, styles.default]
                                    }>
                                        <Text style={styles.number}>
                                            {number}
                                        </Text>
                                    </View>
                                );
                            })}
                            <View style={styles.icon}><Icon name="delete" onPress={() => {dispatchRemove(index)}} color={Colors.red} /></View>
                        </View>
                    );
                })}
                </View> : <Text style={styles.message}>Press + to add to the ban list</Text>}
                {store.list.show ?  <Input
                    errorStyle={{ color: 'red' }}
                    errorMessage={store.list.list.length > 10 ? 'Cannot add more than 10 sets to the ban list' : 
                        store.list.error ? 'Must provide a unique set of 6 unique numbers between 1 and 49' : null}
                    value={numbers}
                    onChange={e => setNumbersWrapper(e.nativeEvent.text)}
                /> : null }

                <View style={styles.buttonContainer}>
                    {store.list.show ?
                        <View><Icon style={styles.icon} reverse name="add" onPress={() => {dispatchAdd(numbers)}} color={Colors.secondary} /></View> :
                        <View><Icon style={styles.icon} reverse name="add" onPress={() => {dispatchShowAdd()}} color={Colors.primary} /></View> 
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
        alignItems: 'center',
        justifyContent: 'center'
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
    default: {
        backgroundColor: Colors.primary
    },
    number: {
        color: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        paddingLeft: 10,
        margin: 4,
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
});

export default ListScreen;