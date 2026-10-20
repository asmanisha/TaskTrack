import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
  const loadData = async () => {
    const savedTasks = await AsyncStorage.getItem("tasks");
    const savedCompletedTasks =
      await AsyncStorage.getItem("completedTasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    if (savedCompletedTasks) {
      setCompletedTasks(JSON.parse(savedCompletedTasks));
    }
  };

  loadData();
}, []);

  const addTask = async () => {
  if (task.trim() === "") {
    Alert.alert("Invalid Task", "Please enter a task.");
    return;
  }

  const newTask = task.trim();
  const updatedTasks = [...tasks, newTask];

  setTasks(updatedTasks);
  setTask("");

  await AsyncStorage.setItem(
    "tasks",
    JSON.stringify(updatedTasks)
  );
};

   const toggleTask = async (taskName: string) => {
  let updatedCompletedTasks;

  if (completedTasks.includes(taskName)) {
    updatedCompletedTasks = completedTasks.filter(
      (item) => item !== taskName
    );
  } else {
    updatedCompletedTasks = [...completedTasks, taskName];
  }

  setCompletedTasks(updatedCompletedTasks);

  await AsyncStorage.setItem(
    "completedTasks",
    JSON.stringify(updatedCompletedTasks)
  );
};

const deleteTask = async (taskName: string) => {
  const updatedTasks = tasks.filter(
    (item) => item !== taskName
  );

  const updatedCompletedTasks = completedTasks.filter(
    (item) => item !== taskName
  );

  setTasks(updatedTasks);
  setCompletedTasks(updatedCompletedTasks);

  await AsyncStorage.setItem(
    "tasks",
    JSON.stringify(updatedTasks)
  );
  

  await AsyncStorage.setItem(
    "completedTasks",
    JSON.stringify(updatedCompletedTasks)
  );
  
};

  const clearAllTasks = async () => {
  Alert.alert(
    "Clear All Tasks",
    "Are you sure you want to delete all tasks?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear All",
        style: "destructive",
        onPress: async () => {
          setTasks([]);
          setCompletedTasks([]);

          await AsyncStorage.removeItem("tasks");
          await AsyncStorage.removeItem("completedTasks");
        },
      },
    ]
  );
};

  return (
  <View style={styles.container}>
    <Text style={styles.title}>TaskTrack</Text>

    <Text style={styles.subtitle}>
      My Tasks • {tasks.length} tasks • {completedTasks.length} completed
    </Text>

    <TextInput
      style={styles.input}
      placeholder="Enter a task"
      value={task}
      onChangeText={setTask}
    />

    <Pressable style={styles.button} onPress={addTask}>
      <Text style={styles.buttonText}>Add Task</Text>
    </Pressable>

    {tasks.length === 0 ? (
      <Text style={styles.emptyText}>No tasks yet</Text>
    ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Pressable
                style={styles.taskContent}
                onPress={() => toggleTask(item)}
              >
                <Text
                  style={[
                    styles.taskText,
                    completedTasks.includes(item) &&
                      styles.completedTask,
                  ]}
                >
                  {completedTasks.includes(item) ? "✓ " : "☐ "}
                  {item}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert(
                    "Delete Task",
                    `Are you sure you want to delete "${item}"?`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deleteTask(item),
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </Pressable>
            </View>
          )}
        />

        <Pressable
          style={styles.clearButton}
          onPress={clearAllTasks}
        >
          <Text style={styles.clearButtonText}>
            Clear All Tasks
          </Text>
        </Pressable>
      </View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 20,
    marginTop: 20,
  },

  emptyText: {
    fontSize: 16,
    marginTop: 30,
    color: "gray",
    textAlign: "center",
  },

  input: {
  borderWidth: 1,
  borderColor: "#cccccc",
  borderRadius: 8,
  padding: 12,
  marginTop: 25,
  fontSize: 16,
},

button: {
  backgroundColor: "#333333",
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
  alignItems: "center",
},

buttonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "bold",
},

taskItem: {
  padding: 15,
  marginTop: 10,
  backgroundColor: "#f2f2f2",
  borderRadius: 8,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

taskText: {
  fontSize: 16,
},

completedTask: {
  textDecorationLine: "line-through",
  color: "gray",
},

taskContent: {
  flex: 1,
},

deleteButton: {
  padding: 8,
},

deleteText: {
  color: "red",
  fontWeight: "bold",
},

clearButton: {
  marginTop: 15,
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#cccccc",
},

clearButtonText: {
  fontSize: 16,
  fontWeight: "bold",
},
});