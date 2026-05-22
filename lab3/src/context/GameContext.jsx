import { createContext, useContext, useMemo, useState } from 'react';

const GameContext = createContext(null);

const startStats = {
  taps: 0,
  doubleTaps: 0,
  longPresses: 0,
  drags: 0,
  swipesRight: 0,
  swipesLeft: 0,
  pinches: 0,
  totalGestures: 0,
};

export function GameProvider({ children }) {
  const [points, setPoints] = useState(0);
  const [stats, setStats] = useState(startStats);
  const [isDark, setIsDark] = useState(false);

  function addAction(type, value) {
    setPoints((oldPoints) => oldPoints + value);
    setStats((oldStats) => ({
      ...oldStats,
      [type]: oldStats[type] + 1,
      totalGestures: oldStats.totalGestures + 1,
    }));
  }

  function resetGame() {
    setPoints(0);
    setStats(startStats);
  }

  const tasks = useMemo(
    () => [
      {
        title: 'Зробити 10 кліків',
        done: stats.taps >= 10,
        progress: `${Math.min(stats.taps, 10)}/10`,
      },
      {
        title: 'Зробити подвійний клік 5 разів',
        done: stats.doubleTaps >= 5,
        progress: `${Math.min(stats.doubleTaps, 5)}/5`,
      },
      {
        title: 'Утримувати об’єкт 3 секунди',
        done: stats.longPresses >= 1,
        progress: stats.longPresses > 0 ? 'виконано' : '0/1',
      },
      {
        title: 'Перетягнути об’єкт',
        done: stats.drags >= 1,
        progress: stats.drags > 0 ? 'виконано' : '0/1',
      },
      {
        title: 'Зробити свайп вправо',
        done: stats.swipesRight >= 1,
        progress: stats.swipesRight > 0 ? 'виконано' : '0/1',
      },
      {
        title: 'Зробити свайп вліво',
        done: stats.swipesLeft >= 1,
        progress: stats.swipesLeft > 0 ? 'виконано' : '0/1',
      },
      {
        title: 'Змінити розмір об’єкта',
        done: stats.pinches >= 1,
        progress: stats.pinches > 0 ? 'виконано' : '0/1',
      },
      {
        title: 'Отримати 100 очок',
        done: points >= 100,
        progress: `${Math.min(points, 100)}/100`,
      },
      {
        title: 'Власне завдання: зробити 25 жестів',
        done: stats.totalGestures >= 25,
        progress: `${Math.min(stats.totalGestures, 25)}/25`,
      },
    ],
    [points, stats]
  );

  const value = {
    points,
    stats,
    tasks,
    isDark,
    addAction,
    resetGame,
    toggleTheme: () => setIsDark((oldValue) => !oldValue),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
