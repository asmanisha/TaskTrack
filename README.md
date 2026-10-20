# TaskTrack – Mobile Task Manager

TaskTrack is a mobile task management application built using React Native and Expo. It helps users organize their daily tasks, track completed activities, and manage tasks through a simple and user-friendly interface.

This project was developed to gain practical experience in mobile application development, local data persistence, debugging, and Android APK generation.

## Features

- **Add Tasks:** Create tasks with input validation.
- **Complete Tasks:** Mark tasks as completed or switch them back to pending.
- **Delete Tasks:** Remove individual tasks with a confirmation prompt.
- **Clear All Tasks:** Remove all tasks after confirmation.
- **Task Counter:** View the total number of tasks and the number completed.
- **Persistent Local Storage:** Save tasks and completion status using AsyncStorage.
- **Simple User Interface:** Use a clean interface designed with React Native components.
- **Android APK Build:** Configure and generate an installable Android APK using EAS Build.

## Technologies Used

- React Native
- TypeScript
- Expo
- Expo Router
- React Hooks (`useState` and `useEffect`)
- AsyncStorage
- Git and GitHub
- EAS Build

## Getting Started

### Prerequisites

Install the following tools before running the project:

- Node.js and npm
- Git
- Expo Go on your mobile device, or an Android emulator

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/asmanisha/TaskTrack.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TaskTrack
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Open the app using Expo Go or an Android emulator, following the instructions displayed in the terminal.

## Data Storage

TaskTrack uses AsyncStorage to store tasks and their completion status locally on the device. The saved information remains available when the app is closed and reopened.

**Note:** Task data is stored separately on each device. The application does not currently provide cloud storage or synchronization between users' devices.

## Testing and Usage

I use TaskTrack on my own phone and have shared the application with friends and family to use and test on their devices.

This real-device usage has helped me understand the importance of testing mobile applications beyond the development environment.

## Android APK Build

The project is configured to use Expo Application Services (EAS) Build to generate an Android APK.

To start an APK build using the configured preview profile:

```bash
eas build --platform android --profile preview
```

Once the cloud build completes, use the APK link provided by Expo to install the application on a compatible Android device.

## Key Learnings

Through this project, I gained practical experience with:

- Building mobile interfaces using React Native.
- Managing component state with React Hooks.
- Displaying dynamic task lists using FlatList.
- Handling user input, validation, and confirmation alerts.
- Persisting application data using AsyncStorage.
- Debugging application and configuration issues.
- Using Git and GitHub for source code management.
- Configuring EAS Build for Android APK generation.

## Future Improvements

Possible future enhancements include cloud synchronization, user authentication, task reminders, and task categorization.

## Repository

GitHub: https://github.com/asmanisha/TaskTrack

---

**Developed by Manisha S**

A learning project focused on practical mobile application development with React Native and Expo.

## App Screenshot
![TaskTrack App](https://github.com/asmanisha/TaskTrack/blob/master/TaskTrack.jpeg)
