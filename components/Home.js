import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebaseconfig';
import Signin from './Signin';

const Home = ({ route, navigation }) => {
    const { username } = route.params || { username: 'Guest' };
    const [showLogout, setShowLogout] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Signin');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };


    const toggleSwitch = () => {
        const url = isOn
            ? 'http://locoalhost/cm?cmnd=Power%20Off' 
            : 'http://localhost/cm?cmnd=Power%20On'; 

        setIsOn(!isOn);

        fetch(url, {
            method: 'GET', // Utilisation de la méthode GET
            headers: {
                'Content-Type': 'application/json',
                // Ajoutez d'autres headers si nécessaire, par exemple une clé API
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(isOn ? "Lampe éteinte" : "Lampe allumée", data);
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Hello, {username}!</Text>
                <TouchableOpacity onPress={toggleLogout}>
                    <Image source={require('../assets/profile.png')} style={styles.userIcon} />
                </TouchableOpacity>
                {showLogout && (
                    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.title}>Welcome to Smart Home</Text>
            <View style={styles.roomContainer}>
                <View style={styles.room}>
                    <Image source={require('../assets/sofa.png')} style={styles.icon} />
                    <Text style={styles.roomText}>Living Room</Text>
                </View>
                <View style={styles.room}>
                    <Image source={require('../assets/bedroom.png')} style={styles.icon} />
                    <Text style={styles.roomText}>Bedroom</Text>
                </View>
                <View style={styles.room}>
                    <Image source={require('../assets/kitchen.png')} style={styles.icon} />
                    <Text style={styles.roomText}>Kitchen</Text>
                </View>
                <View style={styles.room}>
                    <Image source={require('../assets/bathroom.png')} style={styles.icon} />
                    <Text style={styles.roomText}>Bathroom</Text>
                </View>
            </View>
            <Text style={styles.deviceTitle}>DEVICES</Text>
            <View style={styles.deviceContainer}>
                <View style={styles.deviceCard}>
                    <Text style={styles.deviceText}>Smart Light</Text>
                    <Image source={require('../assets/light-bulb.png')} style={styles.deviceIcon} />
                    <Image source={require('../assets/switch-off (1).png')} style={styles.switchIcon} />
                </View>
                <View style={styles.deviceCard}>
                    <Text style={styles.deviceText}>Smart Router</Text>
                    <Image source={require('../assets/wireless-router.png')} style={styles.deviceIcon} />
                    <Image source={require('../assets/switch-off (1).png')} style={styles.switchIcon} />
                </View>
                <View style={styles.deviceCard}>
                    <Text style={styles.deviceText}>Sonoff</Text>
                    <Image source={require('../assets/sonoff.jpg')} style={styles.deviceIcon} />
                    <TouchableOpacity onPress={toggleSwitch}>
                        <Image
                            source={isOn ? require('../assets/switch-on.png') : require('../assets/switch-off (1).png')}
                            style={styles.switchIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.deviceCard}>
                    <Text style={styles.deviceText}>Smart Speaker</Text>
                    <Image source={require('../assets/voice-assistant.png')} style={styles.deviceIcon} />
                    <Image source={require('../assets/switch-off (1).png')} style={styles.switchIcon} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 25,
        borderColor: '#333',
        borderWidth: 1,
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        top: 50,
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginVertical: 10,
    },
    roomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    room: {
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    roomText: {
        fontSize: 16,
        color: '#333',
    },
    deviceTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginVertical: 10,
    },
    deviceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
    },
    deviceCard: {
        backgroundColor: '#fff',
        width: '47%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    deviceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    deviceIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    switchIcon: {
        width: 50,
        height: 50,
    },
});

export default Home;
