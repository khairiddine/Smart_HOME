import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import {  signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from './firebaseconfig';
const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignin = async () => {
        console.log('Attempting to sign in with:', email); 
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home', { username: email });
        } catch (err) {
            console.error('Sign-in error:', err.message); 
            setError(err.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={require('../assets/loger.png')} style={styles.stretch} />
                <Text style={styles.title}>SMART HOME</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <Button title="Sign In" onPress={handleSignin} />
                    <View style={styles.signupContainer}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signinText}>Create an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stretch: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    formContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    signupContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    signinText: {
        color: 'blue',
        marginTop: 5,
    },
});

export default Signin;
