import React from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Wrapper from '../components/Wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { smartToggle, toggleBalancer, toggleBan } from '../redux/reducers/config';

const ConfigScreen = () => {
    
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const dispatchSmartToggle = () => dispatch(smartToggle());
    const dispatchToggleBalancer = () => dispatch(toggleBalancer());
    const dispatchToggleBan = () => dispatch(toggleBan());

    return (
        <Wrapper>
            <Header title="Configuration" />
            <View style={styles.mainContainer} >
                <View style={styles.toggleContainer}>
                    <Text style={styles.text}>Toggle Smart Select</Text>
                    <Switch
                        style={styles.toggle}
                        onValueChange={()=> {dispatchSmartToggle()}}
                        value={store.config.smartToggle}
                    />
                </View>
                <View style={styles.toggleContainer}>
                    <Text style={styles.text}>Toggle Balancer</Text>
                    <Switch
                        style={styles.toggle}
                        onValueChange={()=> {dispatchToggleBalancer()}}
                        value={store.config.toggleBalancer}
                    />
                </View>
                <View style={styles.toggleContainer}>
                    <Text style={styles.text}>Toggle Ban</Text>
                    <Switch
                        style={styles.toggle}
                        onValueChange={()=> {dispatchToggleBan()}}
                        value={store.config.toggleBan}
                    />
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
    toggleContainer: {
        marginTop: 30,
        flexDirection: 'row'
    },
    text: {
        width: 130
    },
    toggle: {
        marginLeft: 20,
        marginBottom: 20
    },

});

export default ConfigScreen;