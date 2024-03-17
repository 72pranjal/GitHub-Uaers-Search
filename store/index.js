export const state = () => ({
  gitHubUsers: [],
  totalUserByQuery: 0,
  autosuggestUserCount: 0,
  autoSuggestModelData: [],
  apiError: "",
  isSuggestedUser: false,
});

export const mutations = {
  setGitHubUsers(state, users) {
    state.gitHubUsers = users;
  },
  setTotalUserByQuery(state, count) {
    state.totalUserByQuery = count;
  },
  setAutoSuggestModelData(state, value) {
    state.autoSuggestModelData = value;
  },
  setAutosuggestUserCount(state, value) {
    state.autosuggestUserCount = value;
  },
  setApiError(state, value) {
    state.apiError = value;
  },
  setIsSuggestedUser(state, value) {
    state.isSuggestedUser = value;
  },
};

export const actions = {
  async searchUsers({ commit }, payload) {
    try {
      const response = await this.$axios.$get(
        `https://api.github.com/search/users?q=${payload.query}`
      );
      if (response) {
        if (payload.check) {
          if (response.total_count > 0) {
            commit("setIsSuggestedUser", true);
            commit("setAutoSuggestModelData", response.items);
            commit("setAutosuggestUserCount", response.total_count);
          } else {
            commit("setIsSuggestedUser", false);
          }
        } else {
          commit("setAutoSuggestModelData", []);
          commit("setAutosuggestUserCount", 0);
          commit("setGitHubUsers", response.items);
          commit("setTotalUserByQuery", response.total_count);
          commit("setIsSuggestedUser", false);
        }
      }
    } catch (error) {
      commit("setApiError", error);
      commit("setAutoSuggestModelData", []);
      commit("setAutosuggestUserCount", 0);
      commit("setGitHubUsers", []);
      commit("setTotalUserByQuery", 0);
      console.error("Error searching users:", error);
    }
  },
};
