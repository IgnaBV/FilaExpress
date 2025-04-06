import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const toastConfig = {
  success: (props: any) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: theme.tint,
          borderLeftWidth: 5,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
        }}
        text2Style={{
          fontSize: 14,
          color: '#555',
        }}
      />
    );
  },

  error: (props: any) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: theme.tint,
          borderLeftWidth: 5,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
        }}
        text2Style={{
          fontSize: 14,
          color: '#555',
        }}
      />
    );
  },
};

export default toastConfig;
