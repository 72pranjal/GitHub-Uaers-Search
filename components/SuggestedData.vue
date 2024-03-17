<template>
  <div class="autosuggest-data" v-if="getUserData && getUserData.length > 0">
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
            to Search Query ( {{ $store.state.totalUserByQuery }} )
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
      seachQuery: ''
    };
  },
  computed: {
    getUserData() {
      if(this.$store.state.autoSuggestModelData && this.$store.state.autoSuggestModelData.length > 9) {
         const reducedUser = this.$store.state.autoSuggestModelData.slice(0, 8);
         return reducedUser;
      }
      return this.$store.state.autoSuggestModelData
    }
  },
  methods: {
    updateQuery(e) {
      this.seachQuery = e.target.value.trim()
    },
    gotoSearchPage() {
      this.$router.push({ path: '/github-search', query: { q: this.seachQuery } });
    },
    onEnterKey() {
      if(this.seachQuery !== '') {
        this.$router.push({ path: '/github-search', query: { q: this.seachQuery } });
      }
    },
   async getUsersOfGithub() {
      if(this.seachQuery !== '') {
        await this.$store.dispatch('searchUsers', {query: this.seachQuery, check: true});
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
    seachQuery: function() {
      if(this.seachQuery.length > 3) {
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
    /* height: 90vh; */
    margin-right: 5px;
    margin-top: 14px;
    max-width: 800px;
    overflow-x: hidden;
    position: absolute;
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
 @media screen and (max-width: 767px) {

  .autosuggest-data{
    top: 75px;
  }
  .github-users {
    height: 85vh;
  }
  
 }
</style>
