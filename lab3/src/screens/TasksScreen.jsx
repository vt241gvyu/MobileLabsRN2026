import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskItem from '../components/TaskItem';
import { useGame } from '../context/GameContext';
import { colors } from '../theme/colors';

export default function TasksScreen() {
  const { tasks, isDark } = useGame();
  const appColors = isDark ? colors.dark : colors.light;
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: appColors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: appColors.text }]}>Challenges</Text>
        <Text style={[styles.subtitle, { color: appColors.muted }]}>
          Виконано {doneCount} з {tasks.length}
        </Text>
      </View>

      {tasks.map((task) => (
        <TaskItem key={task.title} task={task} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
  },
});
