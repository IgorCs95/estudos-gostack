import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import api from './services/api'

// View: representa conteiners ex div 

export default function App() {
    const [ users, setUsers] = useState([]);

    useEffect(() => {
        api.get('users').then(response => {
            console.log(response.data);
            setUsers(response.data);
        });
    }, []);

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7159c1' />

            <View style={styles.container}>
                {users.map(user => <Text style={styles.user} key={user.id}>{user.name}</Text>)}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    user: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',

    }
});