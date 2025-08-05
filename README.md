# 🚀 Startup Idea Evaluator

A React Native app built with Expo CLI that allows users to submit startup ideas, get AI-style feedback, vote on others' ideas, and see a leaderboard. Features dark mode, local persistence with AsyncStorage, and beautiful UI components.

## ✨ Features

### 📱 Core Screens
- **Idea Submission Screen**: Submit startup ideas with name, tagline, and description
- **Idea Listing Screen**: Browse all ideas with voting, search, and sorting capabilities
- **Leaderboard Screen**: Top 5 ideas with beautiful gradient cards and rankings

### 🎯 Key Functionality
- **AI-Style Feedback**: Automatic rating (0-100) and feedback comments for submitted ideas
- **Community Voting**: One vote per idea per device with local tracking
- **Smart Sorting**: Sort by AI rating or community votes
- **Search & Filter**: Real-time search across all idea fields
- **Dark Mode**: System-aware theme with manual toggle option
- **Offline Storage**: Full offline functionality with AsyncStorage
- **Toast Notifications**: User-friendly feedback for all actions

### 🎨 UI/UX Features
- **Material Design**: Built with React Native Paper components
- **Smooth Animations**: Card animations, button interactions, and transitions
- **Responsive Design**: Works on all screen sizes
- **Beautiful Gradients**: Premium look with gradient cards for leaderboard
- **Pull-to-Refresh**: Easy data refreshing across all screens
- **Loading States**: Proper loading indicators and empty states

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo CLI**: Development and build toolchain
- **React Navigation**: Navigation between screens
- **React Native Paper**: Material Design components
- **AsyncStorage**: Local data persistence
- **Expo Linear Gradient**: Beautiful gradient effects
- **React Native Toast Message**: User notifications

## 📁 Project Structure

```
startup-idea-evaluator/
├── src/
│   ├── screens/
│   │   ├── IdeaSubmissionScreen.js    # Submit new startup ideas
│   │   ├── IdeaListingScreen.js       # Browse and vote on ideas
│   │   └── LeaderboardScreen.js       # Top 5 ranked ideas
│   ├── components/
│   │   ├── IdeaCard.js               # Reusable idea display component
│   │   └── SortToggle.js             # Sort option toggle component
│   ├── utils/
│   │   ├── storage.js                # AsyncStorage service layer
│   │   └── generateFakeRating.js     # AI simulation utilities
│   └── context/
│       └── ThemeContext.js           # Dark/light theme management
├── App.js                            # Main app component with navigation
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS) or Android emulator/device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd startup-idea-evaluator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

### Sample Data
The app automatically seeds sample data on first launch:
- **EcoDelivery**: Carbon-neutral food delivery (Rating: 85, Votes: 12)
- **StudyBuddy AI**: Personalized learning companion (Rating: 78, Votes: 8)
- **LocalCraft**: Marketplace for handmade goods (Rating: 92, Votes: 15)

## 📖 Usage Guide

### Submitting Ideas
1. Navigate to the "Submit" tab
2. Fill in your startup name, tagline, and description
3. Tap "Submit Idea" to get instant AI feedback
4. View your submission in the ideas list

### Browsing Ideas
1. Go to the "Ideas" tab to see all submissions
2. Use the search bar to find specific ideas
3. Toggle between sorting by AI rating or community votes
4. Tap "Read More" to expand idea descriptions
5. Vote for ideas you like (one vote per idea)

### Viewing Leaderboard
1. Check the "Leaderboard" tab for top 5 ideas
2. Switch between ranking by votes or AI rating
3. See beautiful gradient cards with 🥇🥈🥉 badges
4. Pull to refresh for latest rankings

### Dark Mode
- Automatically follows system preference
- Manual toggle available in theme context
- Persistent across app sessions

## 💾 Data Structure

Each idea is stored with the following structure:
```javascript
{
  id: string,           // Unique identifier
  name: string,         // Startup name
  tagline: string,      // Brief description
  description: string,  // Detailed explanation
  rating: number,       // AI rating (0-100)
  votes: number,        // Community vote count
  voted: boolean,       // User voted flag
  submittedAt: string,  // ISO date string
  feedback: string      // AI feedback comment
}
```

## 🔧 Development Features

### Storage Service
- Centralized AsyncStorage management
- Error handling and fallbacks
- Data validation and sanitization
- Batch operations for performance

### Theme System
- Context-based theme management
- System preference detection
- Persistent theme selection
- Comprehensive color schemes

### Component Architecture
- Reusable and modular components
- Prop-based customization
- Consistent styling patterns
- Performance optimized

## 🧪 Testing

Run the app locally with:
```bash
expo start
```

Test on different devices:
- **iOS**: Use iOS Simulator or physical device
- **Android**: Use Android emulator or physical device
- **Web**: Test responsive design in browser

## 📦 Building for Production

### Expo Build Service
```bash
# Build APK for Android
expo build:android

# Build IPA for iOS (requires Apple Developer account)
expo build:ios
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
eas build:configure

# Build for production
eas build --platform android
eas build --platform ios
```

## 🚀 Deployment

### Expo Publish
```bash
# Publish to Expo platform
expo publish
```

### App Stores
1. Build production version using EAS Build
2. Download .apk (Android) or .ipa (iOS)
3. Upload to Google Play Store or Apple App Store
4. Follow platform-specific guidelines

## 🎨 Customization

### Adding New Features
1. **New Screens**: Add to `src/screens/` and update navigation
2. **Components**: Create reusable components in `src/components/`
3. **Utilities**: Add helper functions to `src/utils/`
4. **Themes**: Extend theme colors in `ThemeContext.js`

### Styling Guidelines
- Use Material Design principles
- Follow React Native Paper theming
- Maintain consistent spacing and typography
- Support both light and dark themes

## 🐛 Troubleshooting

### Common Issues
1. **Metro bundler errors**: Clear cache with `expo start -c`
2. **iOS build issues**: Ensure Xcode is updated
3. **Android build issues**: Check Android SDK configuration
4. **Navigation issues**: Verify React Navigation setup

### Performance Tips
- Use FlatList for large datasets
- Implement proper loading states
- Optimize images and assets
- Use React.memo for expensive components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ using React Native and Expo

## 🙏 Acknowledgments

- React Native team for the awesome framework
- Expo team for the development tools
- React Native Paper for Material Design components
- Open source community for inspiration and resources

---

## 📱 Screenshots

*Add screenshots of your app here once built*

## 🔗 Demo

- **Expo Link**: [Your Expo publish URL]
- **APK Download**: [Your APK download link]
- **Video Demo**: [Your demo video link]

---

**Happy coding! 🚀**
