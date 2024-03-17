
export const state = () => ({
  searchQuery: '',
  gitHubUsers: [],
  totalUserByQuery: 0,
  autoSuggestModelData: [],
  isShowAutoSuggestModel: true,
});

export const mutations = {
  updateSearchQuery(state, query) {
    state.searchQuery = query;
  },
  setGitHubUsers(state, users) {
     state.gitHubUsers = users
  },
  setTotalUserByQuery(state, count) {
    state.totalUserByQuery = count
  },
  setAutoSuggestModelData(state, value) {
    state.autoSuggestModelData = value
  },
  setAutoSuggestModel(state, value) {
    state.isShowAutoSuggestModel = value
  }
};

export const actions = {
  async searchUsers({ commit }, payload) {
    try {
      const response = await this.$axios.$get(`https://api.github.com/search/users?q=${payload.query}`);
      if(response) {
        if(response.total_count > 0) {
          if(payload.check) {
            commit('setAutoSuggestModelData', response.items)
          } else {
            commit('setAutoSuggestModelData', [])
            commit('setGitHubUsers', response.items);
          }
          commit('setTotalUserByQuery', response.total_count)
        }
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }
}
