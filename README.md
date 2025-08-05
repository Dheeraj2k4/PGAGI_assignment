# 🚀 Startup Idea Evaluator – PGAGI Internship Assignment

A sleek, fully offline React Native app built with Expo CLI that lets users submit startup ideas, get AI-style feedback, vote on others' ideas, and view a leaderboard. Includes confetti animations, swipe gestures, dark mode, and persistent local storage.

## 📱 Features Overview

### 🧾 Idea Submission
- 📝 Startup name, tagline, and description input
- 📂 Category selection: HealthTech, EdTech, FinTech, GreenTech, E-commerce, Others
- 🤖 AI-style rating (0–100) and contextual feedback
- 🎉 Confetti animation on idea submission
- 📦 Data stored locally using `AsyncStorage`

### 📋 Idea Listing
- 🔍 Browse and view all submitted ideas
- 👍 Upvote/unvote toggle (one vote per idea per device)
- 🧠 Shows rating, votes, feedback
- 🧾 Expandable "Read more" for long descriptions
- ↔️ Swipe gesture for idea cards
- 🔃 Sort by rating or votes
- 🗂️ Filter by category
- 📢 Toast messages for every action

### 🏆 Leaderboard
- 🥇 Displays Top 5 ideas ranked by votes
- 🎖️ 🥇🥈🥉 badges for top 3
- 🌈 Gradient design for top cards
- ⚡ Real-time update after voting

## 🎨 UI & UX Highlights
- 🎨 Built with `React Native Paper` (Material Design 3)
- 🌙 Dark mode (auto + toggle)
- 🤏 Swipe gestures via `Gesture Handler`
- 🚫 Prevents duplicate votes
- 📦 Offline-first app (works without internet)
- 📱 Mobile-responsive and fast animations

## 🛠️ Tech Stack
- **React Native** (with Expo CLI)
- **React Navigation**
- **React Native Paper**
- **AsyncStorage** (for local persistence)
- **React Native Gesture Handler**
- **React Native Toast Message**
- **Expo Linear Gradient**
- **MaterialCommunityIcons**

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (v16+)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (for testing on mobile)

### 🧪 Installation & Run
```bash
# Clone the repo
git clone https://github.com/your-username/startup-idea-evaluator
cd startup-idea-evaluator

# Install dependencies
npm install

# Start the Expo server
npx expo start

## 📦 APK Build Instructions

### Recommended: EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure once (creates eas.json)
eas build:configure

# Build Android APK
eas build --platform android

