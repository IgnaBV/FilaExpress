import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [password, setPassword] = useState('');

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleRegister = () => {
    if (!nombre || !numero || !password) {
      Toast.show({
        type: 'error',
        text1: 'Campos obligatorios',
        text2: 'Por favor completá todos los campos',
      });
      return;
    }

    if (numero.length !== 8) {
      Toast.show({
        type: 'error',
        text1: 'Número inválido',
        text2: 'El número debe tener 8 dígitos',
      });
      return;
    }

    const telefonoCompleto = `+591${numero}`;

    router.push({
      pathname: '/auth/verify-register',
      params: {
        nombre,
        numero: telefonoCompleto,
        password,
      },
    });
  };

  const handleNumeroChange = (text: string) => {
    const soloNumeros = text.replace(/[^0-9]/g, '');
    setNumero(soloNumeros);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <View style={styles.inputGroup}>
        <View style={styles.prefix}>
          <Text style={styles.prefixText}>+591</Text>
        </View>
        <TextInput
          placeholder="71234567"
          value={numero}
          onChangeText={handleNumeroChange}
          style={styles.phoneInput}
          keyboardType="number-pad"
          maxLength={8}
        />
      </View>

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#F6F8FB',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DADADA',
  },
  inputGroup: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DADADA',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  prefix: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#DADADA',
  },
  prefixText: {
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
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
