import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar ,TouchableOpacity} from 'react-native';

import api from './services/api'

// View: representa conteiners ex div 

export default function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('users').then(response => {
            console.log(response.data);
            setUsers(response.data);
        });
    }, []);

    async function adduser(){
        const response = await api.post('users',{
            name:`Igor ${Date.now()}`,
            idade: 25
        });

        const user = response.data;
        setUsers([...users,user]);

    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={users}
                    keyExtractor={user => user.id}
                    renderItem={({ item: user }) => (
                        <Text style={styles.user}>{user.name}</Text>
                    )}
                />
            
            <TouchableOpacity 
            activeOpacity={0.6} 
            style={styles.button}
            onPress={adduser}
            >
                <Text style={styles.buttonText}>Adicionar Usuario</Text>
            </TouchableOpacity>

            </SafeAreaView>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    user: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign:"center",

    },
    button: {
        backgroundColor: '#FFF',
        margin:20,
        height:50,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:16,
    }
});