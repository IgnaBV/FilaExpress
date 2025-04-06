import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyRegisterScreen() {
  const { nombre, numero, password } = useLocalSearchParams();
  const [codigo, setCodigo] = useState('');

  const handleVerify = () => {
    if (!codigo) {
      Alert.alert('Código requerido');
      return;
    }

    // Simula el guardado del usuario y redirección
    console.log('Usuario registrado:', { nombre, numero, password });
    Alert.alert('✅ Registro exitoso');
    router.replace('/main');
  };

  return (
    <View style={styles.container}>
      {/* Flecha para volver */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Verificá tu número</Text>
      <Text style={styles.subtitle}>Enviamos un código a {numero}</Text>

      <TextInput
        placeholder="Código de verificación"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="number-pad"
        style={styles.input}
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verificar y continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#F6F8FB' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#555', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50, backgroundColor: '#fff', borderRadius: 10,
    paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#DADADA',
  },
  button: {
    height: 50, backgroundColor: '#FF6B00', borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
