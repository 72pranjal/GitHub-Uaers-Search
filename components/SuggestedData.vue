<template>
   <div class="autosuggest-data">
    <div class="" v-if="$store.state.isSuggestedUser">
      <div v-if="getUserData && getUserData.length > 0">
        <div class="github-users">
          <UserCard  
          v-for="user in getUserData" 
          :key="user.id"
          :userLogin="user.login"
          :userImage="user.avatar_url"
          :userId="user.id"
          :userUrl="user.html_url"
          />
        </div>
          <div class="total-users-query" @click="gotoSearchPage">
              <div>
                Go To Search Page - Total Users According 
                to Search Query ( {{ $store.state.autosuggestUserCount }} )
              </div>
          </div>
      </div>
    </div>
    <div v-else>
      <div v-if="searchQuery && searchQuery.length > 1 " class="search-result">
        <h1>No GitHub User Found For "<span>{{ searchQuery }}</span>"</h1>
        <h2>Search Again With Diffrent User Name</h2>
      </div>
    </div>
      
    </div>
</template>

<script>
export default {
  name: "SuggestedData",
  data() {
    return {
      searchBoxElement: "",
      searchQuery: ''
    };
  },
  computed: {
    // Computed Property is used for compute autosuggest user for searched query
    getUserData() {
      if(this.$store.state.autoSuggestModelData && this.$store.state.autoSuggestModelData.length > 9) {
         const reducedUser = this.$store.state.autoSuggestModelData.slice(0, 8);
         return reducedUser;
      }
      return this.$store.state.autoSuggestModelData
    }
  },
  methods: {
    // It is used to obtain real-time values from search input 
    updateQuery(e) {
      this.searchQuery = e.target.value.trim()
    },

    // This function is designed to redirect users to the search page when they
    // click on the "go to search" page container.
    gotoSearchPage() {
      this.$router.push({ path: '/github-search', query: { q: this.searchQuery } });
      this.searchQuery = ''
    },

    // This function is designed to redirect users to the search page when
    // they press "Enter Keyword" on search input filed
    onEnterKey() {
      if(this.searchQuery !== '') {
        this.$router.push({ path: '/github-search', query: { q: this.searchQuery } });
        this.searchQuery = ''
      }
    },

    // This function is designed to dispatch a store action to retrieve values
    // from the GitHub search API based on the user's search query.
   async getUsersOfGithub() {
      if(this.searchQuery !== '') {
        await this.$store.dispatch('searchUsers', {query: this.searchQuery, check: true});
      }
    },
  },
  mounted() {
    this.searchBoxElement = document.querySelector("input[name='st']#search");
    this.searchBoxElement.addEventListener("input", this.updateQuery);
    this.searchBoxElement.addEventListener("change", this.updateQuery);
    this.searchBoxElement.addEventListener('keyup', (event) => {
        if (event.keyCode === 13 || event.code === 'Enter') {
          this.onEnterKey();
        }
      });
  },

  watch: {
    searchQuery: function() {
      if(this.searchQuery.length > 1) {
        this.getUsersOfGithub();
      }
    }
  }
};
</script>

<style> 
.autosuggest-data {
  background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 5px 20px 0 hsla(207,5%,58%,.6);
    height: auto;
    margin-right: 5px;
    margin-top: 14px;
    max-width: 800px;
    overflow-x: hidden;
    position: fixed;
    right: 0;
    top: 38px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: 100%;
    z-index: 99999;
}
.github-users {
  display: flex;
   -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  height: 80vh;
  overflow-y: scroll;

}
.total-users-query {
  padding: 10px;
  width: 100%;
  text-align: center;
  background: #36c2dd;
  border: 2px solid #36c2dd;
  cursor: pointer;
}
.search-result {
    text-align: center;
    padding: 15px 10px 0 10px;
}
.search-result h1 {
    font-size: 16px;
    font-weight:400;
}
.search-result h2 {
    font-size: 15px;
    font-weight: 400;
}
.search-result span {
   font-weight: 600;
}
 @media screen and (max-width: 767px) {

  .autosuggest-data{
    top: 75px;
  }
  .github-users {
    height: 80vh;
  }
  
 }
 @media screen and (max-width: 490px) {
.github-users {
  height: 77vh;
}

}
</style>
