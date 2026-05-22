import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { colors } from '../theme/colors';

export default function SettingsScreen() {
  const { isDark, toggleTheme, resetGame, points, stats } = useGame();
  const appColors = isDark ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: appColors.background }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: appColors.card, borderColor: appColors.border },
        ]}
      >
        <View style={styles.row}>
          <View>
            <Text style={[styles.title, { color: appColors.text }]}>Темна тема</Text>
            <Text style={[styles.note, { color: appColors.muted }]}>Перемикає вигляд гри</Text>
          </View>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: appColors.card, borderColor: appColors.border },
        ]}
      >
        <Text style={[styles.title, { color: appColors.text }]}>Статистика</Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>Очки: {points}</Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>Tap: {stats.taps}</Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>
          Double tap: {stats.doubleTaps}
        </Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>Long press: {stats.longPresses}</Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>Drag: {stats.drags}</Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>
          Swipe right: {stats.swipesRight}
        </Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>Swipe left: {stats.swipesLeft}</Text>
        <Text style={[styles.stat, { color: appColors.muted }]}>Pinch: {stats.pinches}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? appColors.objectDark : appColors.object,
          },
        ]}
        onPress={resetGame}
      >
        <Text style={styles.buttonText}>Скинути гру</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  note: {
    marginTop: 4,
    fontSize: 14,
  },
  stat: {
    marginTop: 8,
    fontSize: 15,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
