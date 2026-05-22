import { StyleSheet, Text, View } from 'react-native';
import { useGame } from '../context/GameContext';
import { colors } from '../theme/colors';

export default function TaskItem({ task }) {
  const { isDark } = useGame();
  const appColors = isDark ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.item,
        { backgroundColor: appColors.card, borderColor: appColors.border },
      ]}
    >
      <View
        style={[
          styles.mark,
          {
            borderColor: task.done ? appColors.success : appColors.muted,
            backgroundColor: task.done ? appColors.success : 'transparent',
          },
        ]}
      >
        <Text style={styles.markText}>{task.done ? '✓' : ''}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={[styles.title, { color: appColors.text }]}>{task.title}</Text>
        <Text style={[styles.progress, { color: appColors.muted }]}>{task.progress}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  mark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  markText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  progress: {
    marginTop: 3,
    fontSize: 13,
  },
});
