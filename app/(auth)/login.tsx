import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { storeIsLogin } from '@/logic/async_storage';

const Login = () => {
    
    
  
    const users = [
        { username: 'user1', password: '123456' },
        { username: 'user2', password: '123456789' }
    ];
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const authentication = () => {
        const userAccount = users.find(user => user.username === userName);
        if (!userAccount) {
            setError(true);
            setErrorMessage("User doesn't exist!");
        } else if (userAccount.password !== password) {
            setError(true);
            setErrorMessage("Password is incorrect!");
        } else {
            setError(false);
            setUserName("");
            setPassword("");
            storeIsLogin("true");
            router.replace("/(tabs)/home");
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <StatusBar style="auto" />
                    <View style={styles.header}>
                        <Text style={styles.title}>Login</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your username"
                            value={userName}
                            autoCapitalize="none"
                            onChangeText={setUserName}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            keyboardType="default"
                            value={password}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                        />
                    </View>

                    {error && (
                        <View style={styles.errorBox}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    )}

                    <TouchableOpacity 
                        onPress={authentication} 
                        activeOpacity={0.8}
                        disabled={!userName || !password} 
                    >
                        <View style={[styles.button, (!userName || !password) && styles.buttonDisabled]}>
                            <Text style={styles.buttonText}>Confirm and Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignSelf: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#444',
    },
    textInput: {
        borderWidth: 1.5,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: "#ccc", 
    },
    errorBox: {
        backgroundColor: '#fdecea',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    errorText: {
        color: '#d32f2f',
        fontWeight: 'bold',
    }
});
