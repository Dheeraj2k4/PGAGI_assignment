import AsyncStorage from '@react-native-async-storage/async-storage';

const IDEAS_KEY = 'startup_ideas';
const VOTES_KEY = 'user_votes';

export const storageService = {
  // Get all ideas from storage
  async getIdeas() {
    try {
      const ideas = await AsyncStorage.getItem(IDEAS_KEY);
      return ideas ? JSON.parse(ideas) : [];
    } catch (error) {
      console.error('Error getting ideas:', error);
      return [];
    }
  },

  // Save ideas to storage
  async saveIdeas(ideas) {
    try {
      await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
      return true;
    } catch (error) {
      console.error('Error saving ideas:', error);
      return false;
    }
  },

  // Add a new idea
  async addIdea(idea) {
    try {
      const existingIdeas = await this.getIdeas();
      const updatedIdeas = [...existingIdeas, idea];
      return await this.saveIdeas(updatedIdeas);
    } catch (error) {
      console.error('Error adding idea:', error);
      return false;
    }
  },

  // Update an idea (e.g., increment votes)
  async updateIdea(ideaId, updates) {
    try {
      const ideas = await this.getIdeas();
      const updatedIdeas = ideas.map(idea => 
        idea.id === ideaId ? { ...idea, ...updates } : idea
      );
      return await this.saveIdeas(updatedIdeas);
    } catch (error) {
      console.error('Error updating idea:', error);
      return false;
    }
  },

  // Get user votes (to track which ideas user has voted for)
  async getUserVotes() {
    try {
      const votes = await AsyncStorage.getItem(VOTES_KEY);
      return votes ? JSON.parse(votes) : [];
    } catch (error) {
      console.error('Error getting user votes:', error);
      return [];
    }
  },

  // Add a vote for an idea
  async addVote(ideaId) {
    try {
      const userVotes = await this.getUserVotes();
      if (!userVotes.includes(ideaId)) {
        const updatedVotes = [...userVotes, ideaId];
        await AsyncStorage.setItem(VOTES_KEY, JSON.stringify(updatedVotes));
        
        // Also increment the vote count on the idea
        const ideas = await this.getIdeas();
        const updatedIdeas = ideas.map(idea => 
          idea.id === ideaId 
            ? { ...idea, votes: idea.votes + 1, voted: true }
            : idea
        );
        await this.saveIdeas(updatedIdeas);
        return true;
      }
      return false; // Already voted
    } catch (error) {
      console.error('Error adding vote:', error);
      return false;
    }
  },

  // Remove a vote for an idea
  async removeVote(ideaId) {
    try {
      const userVotes = await this.getUserVotes();
      if (userVotes.includes(ideaId)) {
        const updatedVotes = userVotes.filter(id => id !== ideaId);
        await AsyncStorage.setItem(VOTES_KEY, JSON.stringify(updatedVotes));
        
        // Also decrement the vote count on the idea
        const ideas = await this.getIdeas();
        const updatedIdeas = ideas.map(idea => 
          idea.id === ideaId 
            ? { ...idea, votes: Math.max(0, idea.votes - 1), voted: false }
            : idea
        );
        await this.saveIdeas(updatedIdeas);
        return true;
      }
      return false; // Not voted yet
    } catch (error) {
      console.error('Error removing vote:', error);
      return false;
    }
  },

  // Check if user has voted for an idea
  async hasUserVoted(ideaId) {
    try {
      const userVotes = await this.getUserVotes();
      return userVotes.includes(ideaId);
    } catch (error) {
      console.error('Error checking vote status:', error);
      return false;
    }
  },

  // Clear all data (for testing purposes)
  async clearAllData() {
    try {
      await AsyncStorage.removeItem(IDEAS_KEY);
      await AsyncStorage.removeItem(VOTES_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },

  // Seed some sample data
};
