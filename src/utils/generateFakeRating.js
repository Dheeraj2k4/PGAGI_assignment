// Generate a fake AI rating between 0 and 100
export const generateFakeRating = () => {
  return Math.floor(Math.random() * 101);
};

// Generate fake AI feedback comments
export const generateFakeFeedback = () => {
  const feedbackOptions = [
    "Looks scalable!",
    "Risky but promising!",
    "Strong market potential!",
    "Innovative approach!",
    "Consider the competition",
    "Solid business model!",
    "Great execution needed",
    "Market timing is crucial",
    "Focus on user acquisition",
    "Revenue model unclear",
    "High growth potential!",
    "Unique value proposition",
    "Technical feasibility concerns",
    "Strong team required",
    "Impressive concept!",
    "Market validation needed",
    "Disruptive technology!",
    "Customer pain point solved",
    "Monetization strategy unclear",
    "Excellent market fit!"
  ];
  
  return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
};

// Generate a unique ID (simple version of UUID)
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Calculate days since submission
export const getDaysSinceSubmission = (submittedAt) => {
  const now = new Date();
  const submitted = new Date(submittedAt);
  const diffTime = Math.abs(now - submitted);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

// Format rating with color coding
export const getRatingColor = (rating) => {
  if (rating >= 80) return '#4CAF50'; // Green
  if (rating >= 60) return '#FF9800'; // Orange
  if (rating >= 40) return '#FFC107'; // Yellow
  return '#F44336'; // Red
};

// Get leaderboard badges
export const getLeaderboardBadge = (position) => {
  switch (position) {
    case 0: return '🥇';
    case 1: return '🥈';
    case 2: return '🥉';
    default: return `#${position + 1}`;
  }
};
