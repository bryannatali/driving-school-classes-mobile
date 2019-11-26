import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../services/api';

export default function List() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function loadClasses() {
            const response = await api.get('/classes');
            setClasses(response.data);
        }

        loadClasses();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topMenu}>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Nova Aula</Text></TouchableOpacity>
            </View>
            <View>
                <FlatList
                    style={styles.list}
                    data={classes}
                    keyExtractor={_class => _class._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemClassDate}>
                                {
                                    new Date(item.date).getDate() + new Date(item.date).getMonth() === new Date().getDate() + new Date().getMonth() ?
                                        'Hoje às ' + new Date(item.date).toLocaleTimeString() : new Date(item.date).toLocaleDateString() + ' às ' + new Date(item.date).toLocaleTimeString()
                                }
                            </Text>
                            <View style={styles.itemClassTypeVehicleContainer}>
                                <Text style={styles.itemClassType}>
                                    Aula de {item.type}
                                </Text>
                                <Text style={styles.itemClassVehicle}>
                                    {item.vehicle}
                                </Text>
                            </View>
                            <Text style={styles.itemClassInstructor}>
                                Instrutor: {item.instructor}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', //#7159c1
        justifyContent: 'center',
        alignItems: 'center',
    },

    topMenu: {
        flex: 1,
        marginTop: 100,
    },

    button: {
        backgroundColor: '#7159c1',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        padding: 5,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    list: {
        paddingHorizontal: 20,
        marginTop: 100,
        flex: 1
    },

    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: '#ddd',
    },

    itemClassTypeVehicleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    itemClassDate: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#d41919',
        width: '100%',
        borderRadius: 5
    },

    itemClassType: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#89918e',
    },

    itemClassInstructor: {
        fontSize: 15,
        width: '100%',
    },

    itemClassVehicle: {
        fontSize: 15,
        color: '#0082d9',
    },

});