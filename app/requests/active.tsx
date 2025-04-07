import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Simulación de solicitudes activas
const solicitudesSimuladas = [
  {
    id: '1',
    surtidor: 'Surtidor El Alto',
    lat: -16.511,
    lng: -68.123,
    precio: 20,
    estado: 'Pendiente',
  },
  {
    id: '2',
    surtidor: 'Surtidor Miraflores',
    lat: -16.509,
    lng: -68.119,
    precio: 25,
    estado: 'Aceptada',
  },
  {
    id: '3',
    surtidor: 'Surtidor Cala Cala',
    lat: -16.508,
    lng: -68.122,
    precio: 18,
    estado: 'Pendiente',
  },
];

export default function ActiveRequestsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes activas</Text>

      <FlatList
        data={solicitudesSimuladas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="location" size={20} color="#555" />
              <Text style={styles.surtidor}>{item.surtidor}</Text>
            </View>
            <Text style={styles.info}>
              📍 Lat: {item.lat.toFixed(4)} / Lng: {item.lng.toFixed(4)}
            </Text>
            <Text style={styles.info}>💰 Precio: Bs {item.precio}</Text>
            <Text style={styles.estado}>🕓 Estado: {item.estado}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay solicitudes activas por ahora.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F8FB',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1E1E1E',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  surtidor: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  estado: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
