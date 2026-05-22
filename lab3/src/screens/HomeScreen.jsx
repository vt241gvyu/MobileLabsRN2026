import { StyleSheet, Text, View } from 'react-native';
import ClickerObject from '../components/ClickerObject';
import { useGame } from '../context/GameContext';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const { points, stats, isDark } = useGame();
  const appColors = isDark ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: appColors.background }]}>
      <View
        style={[
          styles.scoreCard,
          { backgroundColor: appColors.card, borderColor: appColors.border },
        ]}
      >
        <Text style={[styles.smallText, { color: appColors.muted }]}>Очки</Text>
        <Text style={[styles.score, { color: appColors.text }]}>{points}</Text>
        <Text style={[styles.smallText, { color: appColors.muted }]}>
          Жестів зроблено: {stats.totalGestures}
        </Text>
      </View>

      <View style={styles.playZone}>
        <ClickerObject />
      </View>

      <View
        style={[
          styles.helpBox,
          { backgroundColor: appColors.primarySoft, borderColor: appColors.border },
        ]}
      >
        <Text style={[styles.helpText, { color: appColors.text }]}>
          Tap +1, double tap +2, long press +10, drag +5, swipe +7, pinch +8
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  scoreCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  score: {
    fontSize: 46,
    fontWeight: '800',
    marginVertical: 4,
  },
  playZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  helpText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
