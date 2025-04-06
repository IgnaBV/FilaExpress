const tintColorLight = '#96D5FF'; // tu nuevo color principal
const tintColorDark = '#96D5FF';  // usalo también en dark si querés

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight, // ya apuntando a tu nuevo color
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#96D5FF', // 🔵 nuevo campo explícito
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#96D5FF', // 🔵 nuevo campo explícito
  },
};
