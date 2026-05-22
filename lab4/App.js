import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar as NativeStatusBar,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

const rootDirectory = FileSystem.documentDirectory;

function joinUri(directory, name) {
  return `${directory}${name}`;
}

function formatBytes(value) {
  if (typeof value !== 'number') {
    return 'немає даних';
  }

  if (value < 1024) {
    return `${value} Б`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} КБ`;
  }

  if (value < 1024 * 1024 * 1024) {
    return `${(value / 1024 / 1024).toFixed(1)} МБ`;
  }

  return `${(value / 1024 / 1024 / 1024).toFixed(1)} ГБ`;
}

function getFileType(name, isDirectory) {
  if (isDirectory) {
    return 'папка';
  }

  const dotIndex = name.lastIndexOf('.');
  return dotIndex === -1 ? 'файл без розширення' : name.slice(dotIndex + 1);
}

function normalizeFileName(name) {
  const trimmed = name.trim();
  return trimmed.toLowerCase().endsWith('.txt') ? trimmed : `${trimmed}.txt`;
}

export default function App() {
  const [currentUri, setCurrentUri] = useState(rootDirectory);
  const [history, setHistory] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [memory, setMemory] = useState({
    total: null,
    free: null,
    used: null,
    error: '',
  });

  const [createMode, setCreateMode] = useState(null);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');

  const [openedFile, setOpenedFile] = useState(null);
  const [fileText, setFileText] = useState('');

  const pathText = useMemo(() => {
    if (!rootDirectory || !currentUri) {
      return '/';
    }

    const relativePath = currentUri.replace(rootDirectory, '').replace(/\/$/, '');
    return relativePath ? `/ ${relativePath.split('/').join(' / ')}` : '/';
  }, [currentUri]);

  useEffect(() => {
    loadDirectory();
    loadMemoryInfo();
  }, [currentUri]);

  async function loadDirectory() {
    if (!currentUri) {
      Alert.alert('Помилка', 'FileSystem.documentDirectory недоступний.');
      return;
    }

    try {
      setLoading(true);
      const names = await FileSystem.readDirectoryAsync(currentUri);
      const loadedItems = await Promise.all(
        names.map(async (name) => {
          const uri = joinUri(currentUri, name);
          const info = await FileSystem.getInfoAsync(uri);

          return {
            name,
            uri,
            isDirectory: info.isDirectory,
            size: info.size,
            modificationTime: info.modificationTime,
          };
        })
      );

      loadedItems.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) {
          return a.isDirectory ? -1 : 1;
        }

        return a.name.localeCompare(b.name);
      });

      setItems(loadedItems);
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося прочитати папку.');
    } finally {
      setLoading(false);
    }
  }

  async function loadMemoryInfo() {
    try {
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();

      setMemory({
        total,
        free,
        used: total - free,
        error: '',
      });
    } catch (error) {
      console.log(error);
      setMemory({
        total: null,
        free: null,
        used: null,
        error: 'немає даних',
      });
    }
  }

  function openCreateModal(mode) {
    setCreateMode(mode);
    setNewName('');
    setNewText('');
  }

  function closeCreateModal() {
    setCreateMode(null);
    setNewName('');
    setNewText('');
  }

  async function createItem() {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      Alert.alert('Помилка', 'Введіть назву.');
      return;
    }

    if (trimmedName.includes('/') || trimmedName.includes('\\')) {
      Alert.alert('Помилка', 'Назва не повинна містити / або \\.');
      return;
    }

    try {
      if (createMode === 'folder') {
        await FileSystem.makeDirectoryAsync(joinUri(currentUri, trimmedName));
      } else {
        const fileName = normalizeFileName(trimmedName);
        await FileSystem.writeAsStringAsync(joinUri(currentUri, fileName), newText);
      }

      closeCreateModal();
      loadDirectory();
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося створити елемент. Можливо, така назва вже існує.');
    }
  }

  function goBack() {
    if (history.length === 0) {
      return;
    }

    const previous = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentUri(previous);
  }

  async function openItem(item) {
    if (item.isDirectory) {
      setHistory([...history, currentUri]);
      setCurrentUri(`${item.uri}/`);
      return;
    }

    if (!item.name.toLowerCase().endsWith('.txt')) {
      Alert.alert('Перегляд', 'Редагування доступне тільки для .txt файлів.');
      return;
    }

    try {
      const text = await FileSystem.readAsStringAsync(item.uri);
      setOpenedFile(item);
      setFileText(text);
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося відкрити файл.');
    }
  }

  async function saveOpenedFile() {
    if (!openedFile) {
      return;
    }

    try {
      await FileSystem.writeAsStringAsync(openedFile.uri, fileText);
      Alert.alert('Готово', 'Файл збережено.');
      loadDirectory();
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося зберегти файл.');
    }
  }

  function confirmDelete(item) {
    Alert.alert(
      'Видалення',
      `Видалити "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => deleteItem(item),
        },
      ]
    );
  }

  async function deleteItem(item) {
    try {
      await FileSystem.deleteAsync(item.uri);
      loadDirectory();
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося видалити елемент.');
    }
  }

  function showInfo(item) {
    const modified = item.modificationTime
      ? new Date(item.modificationTime * 1000).toLocaleString()
      : 'немає даних';

    Alert.alert(
      'Інформація',
      [
        `Назва: ${item.name}`,
        `Тип: ${getFileType(item.name, item.isDirectory)}`,
        `Розмір: ${formatBytes(item.size)}`,
        `Змінено: ${modified}`,
      ].join('\n')
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.itemMain} onPress={() => openItem(item)}>
          <Text style={styles.itemIcon}>{item.isDirectory ? '📁' : '📄'}</Text>
          <View style={styles.itemTextWrap}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemSubtext}>
              {getFileType(item.name, item.isDirectory)} • {formatBytes(item.size)}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.itemActions}>
          <TouchableOpacity style={styles.smallButton} onPress={() => showInfo(item)}>
            <Text style={styles.smallButtonText}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallButton, styles.deleteButton]} onPress={() => confirmDelete(item)}>
            <Text style={styles.smallButtonText}>Del</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>Файловий менеджер</Text>
        <Text style={styles.path}>{pathText}</Text>
      </View>

      <View style={styles.memoryBox}>
        <Text style={styles.sectionTitle}>Пам'ять пристрою</Text>
        <Text style={styles.memoryText}>Загалом: {formatBytes(memory.total)}</Text>
        <Text style={styles.memoryText}>Вільно: {formatBytes(memory.free)}</Text>
        <Text style={styles.memoryText}>Зайнято: {formatBytes(memory.used)}</Text>
        {!!memory.error && <Text style={styles.memoryError}>Статистика: {memory.error}</Text>}
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.button, history.length === 0 && styles.disabledButton]}
          onPress={goBack}
          disabled={history.length === 0}
        >
          <Text style={styles.buttonText}>Вгору</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openCreateModal('folder')}>
          <Text style={styles.buttonText}>Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openCreateModal('file')}>
          <Text style={styles.buttonText}>Файл</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={loadDirectory}>
          <Text style={styles.buttonText}>Оновити</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
        contentContainerStyle={items.length === 0 && styles.emptyList}
        ListEmptyComponent={<Text style={styles.emptyText}>{loading ? 'Завантаження...' : 'Папка порожня'}</Text>}
      />

      <Modal visible={!!createMode} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {createMode === 'folder' ? 'Нова папка' : 'Новий .txt файл'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Назва"
              value={newName}
              onChangeText={setNewName}
            />

            {createMode === 'file' && (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Початковий текст"
                value={newText}
                onChangeText={setNewText}
                multiline
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.secondaryButton} onPress={closeCreateModal}>
                <Text style={styles.secondaryButtonText}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={createItem}>
                <Text style={styles.primaryButtonText}>Створити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={!!openedFile} animationType="slide">
        <SafeAreaView style={styles.editor}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>{openedFile?.name}</Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setOpenedFile(null)}>
              <Text style={styles.secondaryButtonText}>Закрити</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.editorInput}
            value={fileText}
            onChangeText={setFileText}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveOpenedFile}>
            <Text style={styles.primaryButtonText}>Зберегти зміни</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? NativeStatusBar.currentHeight || 0 : 0,
    backgroundColor: '#f4f6f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dce2e8',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#18202a',
  },
  path: {
    marginTop: 6,
    color: '#52606d',
    fontSize: 14,
  },
  memoryBox: {
    margin: 12,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dce2e8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#18202a',
    marginBottom: 6,
  },
  memoryText: {
    fontSize: 14,
    color: '#303b46',
    marginTop: 2,
  },
  memoryError: {
    marginTop: 4,
    color: '#a03a2a',
  },
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 8,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#9aa6b2',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dce2e8',
  },
  itemMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 34,
    fontSize: 24,
  },
  itemTextWrap: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18202a',
  },
  itemSubtext: {
    marginTop: 2,
    fontSize: 13,
    color: '#687684',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 6,
  },
  smallButton: {
    paddingHorizontal: 9,
    paddingVertical: 7,
    backgroundColor: '#64748b',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  smallButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#687684',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 18,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#18202a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#c9d2dc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  secondaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#e5e9ef',
  },
  secondaryButtonText: {
    color: '#26313d',
    fontWeight: '700',
  },
  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#2563eb',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  editor: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 14,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  editorTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#18202a',
  },
  editorInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#c9d2dc',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 6,
    backgroundColor: '#15803d',
    alignItems: 'center',
  },
});
