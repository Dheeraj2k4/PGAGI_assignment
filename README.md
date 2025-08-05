# 🚀 Startup Idea Evaluator - PGAGI Internship Assignment

A comprehensive React Native app built with Expo CLI that allows users to submit startup ideas, get AI-style feedback, vote on others' ideas, and see a leaderboard. Features confetti animations, dark mode, swipe gestures, and complete local persistence.

## ✅ CORE FEATURES IMPLEMENTED

### 🧾 1. Idea Submission Screen
- ✅ **Startup Name input** - Clean text input with validation
- ✅ **Tagline input** - Catchy one-liner for the idea
- ✅ **Description input** - Detailed multi-line description
- ✅ **Category selector** - HealthTech, EdTech, E-commerce, GreenTech, FinTech, Others
- ✅ **Generate fake AI rating (0–100)** - Intelligent rating algorithm
- ✅ **Generate fun AI feedback comment** - Contextual feedback messages
- ✅ **Store idea in AsyncStorage** - Complete offline persistence
- ✅ **Show toast: "Idea submitted!"** - User feedback notifications
- ✅ **Confetti animation 🎉** - Custom confetti on successful submission
- ✅ **Navigate to Idea Listing screen** - Smooth navigation flow

### 📜 2. Idea Listing Screen
- ✅ **Display all saved ideas** - Complete idea management
- ✅ **Show: name, tagline, rating, votes** - Comprehensive idea cards
- ✅ **"Read more" toggle for full description** - Expandable content
- ✅ **"Upvote" button** - Interactive voting system
- ✅ **Prevent multiple votes** - One vote per idea per device
- ✅ **Allow undo/unvote 👍🏻** - **Toggleable voting system**
- ✅ **Toasts on vote / unvote 📢** - "Voted!" and "Vote removed!" feedback
- ✅ **Swipe gesture on idea card 🤏** - Swipe to expand descriptions
- ✅ **Sort by Rating & Votes** - Dual sorting options
- ✅ **Filter by Category** - Complete category filtering system

### 🏆 3. Leaderboard Screen
- ✅ **Show Top 5 ideas** - Best performing ideas
- ✅ **Sorted by votes** - Community-driven rankings
- ✅ **🥇🥈🥉 Badges for top 3** - Beautiful ranking indicators
- ✅ **Card UI with gradient / shadow** - Premium visual design
- ✅ **Smooth UI transitions** - Polished animations

## � DATA MANAGEMENT - FULLY IMPLEMENTED
- ✅ **useState & useReducer** - Complete state management for UI
- ✅ **AsyncStorage for submitted ideas** - Persistent idea storage
- ✅ **AsyncStorage for vote tracking** - Vote state per device
- ✅ **AsyncStorage for dark mode preference** - Theme persistence
- ✅ **Complete offline functionality** - No internet required

## 💄 BONUS FEATURES - ALL IMPLEMENTED
- ✅ **🎉 Confetti animation on idea submit** - Custom web-compatible confetti
- ✅ **📢 Toast notifications** - Complete feedback system (submit, vote, unvote)
- ✅ **🌓 Dark mode toggle** - System-aware with manual override
- ✅ **🏷️ Category filtering system** - Filter by all categories
- ✅ **🤏 Swipe gestures on cards** - Swipe to expand/collapse
- ✅ **💬 AI feedback message** - Contextual AI-generated feedback
- ✅ **Custom icons** - MaterialCommunityIcons throughout
- ✅ **Empty state UI** - Beautiful empty states when no ideas exist
- ✅ **Loading indicators** - Smooth loading states

## 🎨 POLISH & PGAGI STYLING
- ✅ **Clean UI aesthetic** - Professional, modern design
- ✅ **Consistent theming** - Material Design 3 with custom colors
- ✅ **Mobile-friendly design** - Responsive across all screen sizes
- ✅ **Soft gradients** - Beautiful gradient effects on leaderboard
- ✅ **Glass effect cards** - Modern card design with shadows
- ✅ **Consistent spacing** - Perfect padding and margins throughout

## �🛠️ Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo CLI**: Development and build toolchain  
- **React Navigation**: Bottom tab navigation with theming
- **React Native Paper**: Material Design 3 components
- **AsyncStorage**: Complete local data persistence
- **React Native Gesture Handler**: Swipe gesture support
- **React Native Toast Message**: User notifications
- **Expo Linear Gradient**: Beautiful gradient effects
- **MaterialCommunityIcons**: Comprehensive icon library

## 🚀 DEPLOYMENT & RUNNING THE APP

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Quick Start
```bash
# Clone the repository
git clone [YOUR_REPO_URL]
cd startup-idea-evaluator

# Install dependencies
npm install

# Start the development server
expo start

# Scan QR code with Expo Go app
# Or press 'w' for web version
```

### 📱 Testing on Device
1. Install **Expo Go** from App Store/Play Store
2. Run `expo start` in project directory
3. Scan QR code with Expo Go app
4. App will load directly on your device

### 🌐 Web Version
- Run `expo start` and press `w`
- Opens in browser at `http://localhost:8081`
- Full functionality available on web

### 📦 Building for Production
```bash
# Build APK for Android
expo build:android

# Build for iOS (requires Apple Developer account)
expo build:ios
```

## 📁 Project Structure

```
startup-idea-evaluator/
├── App.js                           # Main navigation container
├── src/
│   ├── screens/
│   │   ├── IdeaSubmissionScreen.js   # Submit startup ideas with confetti
│   │   ├── IdeaListingScreen.js      # Browse, vote, filter ideas
│   │   └── LeaderboardScreen.js      # Top 5 ranked ideas with badges
│   ├── components/
│   │   ├── IdeaCard.js              # Idea display with voting
│   │   ├── SwipeableIdeaCard.js     # Swipe gesture wrapper
│   │   ├── SimpleConfetti.js        # Custom confetti animation
│   │   ├── SortToggle.js            # Sort options component
│   │   ├── ThemeToggle.js           # Dark mode toggle
│   │   └── ErrorBoundary.js         # Error handling
│   ├── context/
│   │   └── ThemeContext.js          # Theme management
│   └── utils/
│       ├── storage.js               # AsyncStorage service
│       ├── generateFakeRating.js    # AI rating generator
│       └── shadowUtils.js           # Platform shadows
├── assets/                          # App icons and images
└── package.json                     # Dependencies
```

## 🎯 KEY FEATURES WALKTHROUGH

### 💡 Idea Submission Flow
1. **Enter startup details** - Name, tagline, description
2. **Select category** - Choose from 6 predefined categories
3. **AI evaluation** - Automatic rating and feedback generation
4. **Confetti celebration** - Custom animation on successful submission
5. **Auto-navigation** - Smooth transition to Ideas tab

### 🗳️ Voting System
1. **One vote per idea** - Prevents spam voting
2. **Toggleable votes** - Click to vote, click again to unvote
3. **Visual feedback** - Filled/outlined thumbs indicate vote status
4. **Toast notifications** - "Voted!" and "Vote removed!" messages
5. **Persistent storage** - Votes saved across app sessions

### 🏆 Leaderboard Features
1. **Top 5 ideas** - Best performing ideas by votes
2. **Ranking badges** - 🥇🥈🥉 for top 3 positions
3. **Gradient cards** - Beautiful visual design
4. **Real-time updates** - Updates immediately after voting

### 🎨 Advanced UI Features
1. **Dark mode support** - System-aware with manual toggle
2. **Swipe gestures** - Swipe cards to expand descriptions
3. **Category filtering** - Filter ideas by category
4. **Sort options** - Sort by AI rating or community votes
5. **Empty states** - Beautiful placeholders when no data

## 📱 DEMO FEATURES TO SHOWCASE

### Core Functionality
- ✅ Submit a new startup idea
- ✅ See confetti animation on submission
- ✅ Browse ideas in the listing screen
- ✅ Vote and unvote on ideas (toggleable)
- ✅ View leaderboard with top ideas

### Bonus Features
- ✅ Toggle dark mode (top-right corner)
- ✅ Filter ideas by category
- ✅ Sort by rating or votes
- ✅ Swipe idea cards to expand
- ✅ See toast notifications for all actions

## 🏁 FINAL REVIEW CHECKLIST

### ✅ App Functionality
- [x] App runs with no major bugs or crashes
- [x] UX is smooth across all screens
- [x] No placeholder text or unused code
- [x] All screens are mobile-optimized
- [x] Bonus features tested and working
- [x] Submission package ready

### ✅ Core Requirements Met
- [x] Idea submission with AI rating
- [x] Idea listing with voting
- [x] Leaderboard with rankings
- [x] AsyncStorage data persistence
- [x] Toast notifications
- [x] Category system

### ✅ Bonus Features Implemented
- [x] Confetti animation
- [x] Dark mode toggle
- [x] Swipe gestures
- [x] Category filtering
- [x] Toggleable voting system
- [x] Custom icons and polish

## 🎥 Demo Video Guide

### Suggested 2-3 Minute Walkthrough:
1. **App Launch** (15s) - Show splash and navigation
2. **Idea Submission** (45s) - Submit idea, show confetti
3. **Idea Listing** (60s) - Browse, vote/unvote, filter by category
4. **Leaderboard** (30s) - Show top ideas with rankings
5. **Bonus Features** (30s) - Dark mode, swipe gestures

## 🚀 Live Demo

**Web Version**: The app is currently running on `http://localhost:8082`

To test immediately:
1. Open the web version in your browser
2. Submit a new startup idea
3. Watch the confetti animation
4. Go to Ideas tab and vote/unvote
5. Check the leaderboard
6. Toggle dark mode
7. Try category filtering

## 👨‍💻 Developer Notes

This app demonstrates:
- **Clean Architecture** - Modular component structure
- **State Management** - Context API for themes, local state for UI
- **Data Persistence** - Complete AsyncStorage implementation
- **User Experience** - Intuitive navigation and feedback
- **Performance** - Optimized for smooth interactions
- **Cross-Platform** - Works on iOS, Android, and Web

Built with ❤️ for PGAGI Internship Assignment
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
