import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Region } from 'react-native-maps';


const surtidoresSimulados = [
  { id: 1, nombre: 'Surtidor El Alto', lat: -16.511, lng: -68.123 },
  { id: 2, nombre: 'Surtidor Miraflores', lat: -16.509, lng: -68.119 },
  { id: 3, nombre: 'Surtidor Sopocachi', lat: -16.508, lng: -68.122 },
];

export default function MainScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [surtidoresFiltrados, setSurtidoresFiltrados] = useState(surtidoresSimulados);

  // Obtener ubicación actual
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Filtrar surtidores según texto
  useEffect(() => {
    const filtrados = surtidoresSimulados.filter((s) =>
      s.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setSurtidoresFiltrados(filtrados);
  }, [busqueda]);

  if (!region) {
    return (
      <View style={styles.centered}>
        <Text>Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Icono de perfil */}
      <TouchableOpacity onPress={() => router.push('/profile/complete')} style={styles.profileIcon}>
        <Ionicons name="person-circle-outline" size={30} color="#333" />
      </TouchableOpacity>

      {/* Buscador */}
      <TextInput
        placeholder="Buscar surtidor..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.searchBar}
      />

      {/* Mapa */}
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Tu ubicación"
          pinColor="blue"
        />
        {surtidoresFiltrados.map((surtidor) => (
          <Marker
            key={surtidor.id}
            coordinate={{ latitude: surtidor.lat, longitude: surtidor.lng }}
            title={surtidor.nombre}
          />
        ))}
      </MapView>

      {/* Botones */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/requests/create')}>
          <Text style={styles.buttonText}>Crear solicitud</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/requests/active')}>
          <Text style={styles.buttonText}>Ver solicitudes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 3,
  },
  searchBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 60,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  map: {
    flex: 1,
  },
  actions: {
    padding: 20,
    backgroundColor: '#F6F8FB',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
