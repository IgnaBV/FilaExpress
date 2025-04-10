import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [numero, setNumero] = useState('');
  const [password, setPassword] = useState('');

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleLogin = () => {
    if (!numero || !password) {
      Toast.show({
        type: 'error',
        text1: 'Campos incompletos',
        text2: 'Ingresá tu número y contraseña',
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

    // Simulación de login exitoso
    if (numero === '11111111' && password === '123') {
      Toast.show({
        type: 'success',
        text1: 'Bienvenido',
      });
      router.replace('/main');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Credenciales incorrectas',
        text2: 'Verificá tu número y contraseña',
      });
    }
  };

  const handleNumeroChange = (text: string) => {
    const soloNumeros = text.replace(/[^0-9]/g, '');
    setNumero(soloNumeros);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FilaExpress</Text>
      <Text style={styles.subtitle}>Iniciá sesión</Text>

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
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/register')}>
        <Text style={[styles.link, { color: theme.primary }]}>
          ¿No tienes cuenta? Registrate
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#F6F8FB' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 25 },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 10, marginBottom: 15,
    borderWidth: 1, borderColor: '#DADADA', overflow: 'hidden',
  },
  prefix: {
    backgroundColor: '#eee', paddingHorizontal: 12, paddingVertical: 14,
    borderRightWidth: 1, borderRightColor: '#DADADA',
  },
  prefixText: { fontSize: 16, color: '#333' },
  phoneInput: { flex: 1, paddingHorizontal: 15, height: 50, fontSize: 16 },
  input: {
    height: 50, backgroundColor: '#fff', borderRadius: 10,
    paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#DADADA',
  },
  button: {
    height: 50, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  link: { fontSize: 15, textAlign: 'center', textDecorationLine: 'underline' },
});
