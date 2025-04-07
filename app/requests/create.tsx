import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';

export default function CreateRequestScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [region, setRegion] = useState<Region | null>(null);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Region | null>(null);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lastTapRef = useRef<number>(0);
  const doubleTapTimeout = 300; // milisegundos

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      const currentRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(currentRegion);
      setSelectedLocation(currentRegion);
    })();
  }, []);

  const handleCrearSolicitud = () => {
    if (!selectedLocation || !price) {
      alert('Selecciona ubicación y precio');
      return;
    }

    console.log('Solicitud creada:', { selectedLocation, price });
    router.push('/requests/active');
  };

  return (
    <View style={{ flex: 1 }}>
      {region && (
        <MapView
          style={{ flex: 1 }}
          region={region}
          onPress={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            const newRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setSelectedLocation(newRegion);
            setRegion(newRegion);
          }}          
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title="Ubicación seleccionada"
            />
          )}
        </MapView>
      )}

      {/* Barra de búsqueda visual (sin conexión a Google por ahora) */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar surtidor..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="small" color="#888" style={{ marginTop: 5 }} />}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          style={styles.suggestionList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem}>
              <Ionicons name="location-outline" size={20} color="#333" style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 14 }}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Precio y botón de acción */}
      <KeyboardAvoidingView
        style={styles.bottomContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TextInput
          placeholder="Precio del servicio (Bs)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.priceInput}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleCrearSolicitud}
        >
          <Text style={styles.buttonText}>Crear solicitud</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    height: 45,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchButton: {
    width: 45,
    backgroundColor: '#96D5FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#ccc',
  },
  suggestionList: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    zIndex: 11,
    maxHeight: 200,
    borderRadius: 6,
    elevation: 4,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 10,
    zIndex: 5,
  },
  priceInput: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  button: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
