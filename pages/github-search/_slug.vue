<template>
  <div class="search-github-users row">
    <div v-show="pageload === false">
      <div v-if="$store.state.totalUserByQuery > 0">
        <div class="search-result">
            <h1>Search Result For "<span>{{ this.seachQuery }}</span>"</h1>
            <h2>We Found "<span>{{ $store.state.totalUserByQuery }}"</span> User For Your Search Query
              "<span>{{ this.seachQuery }}</span>"
            </h2>
        </div>
        <div class="users-container">
          <UserCard
            v-for="user in getUserData"
            :key="user.id"
            :userLogin="user.login"
            :userImage="user.avatar_url"
            :userId="user.id"
            :userUrl="user.html_url"
          />
        </div>
      </div>
      <div v-else>
        <div class="search-result">
            <h1>No GitHub User Found For "<span>{{ this.seachQuery }}</span>"</h1>
            <h2>Search Again With Diffrent User Name</h2>
        </div>
      </div>
    </div>
    <div class="product_loader" v-if="pageload === true"> <img src="/images/giphy.gif" /></div>
  </div>
</template>

<script>
export default {
  name: "GitHubSearch",
  data() {
    return {
        seachQuery: '',
        pageload: false
    };
  },
  computed: {
    getUserData() {
      if (
        this.$store.state.gitHubUsers &&
        this.$store.state.gitHubUsers.length > 0
      ) {
        return this.$store.state.gitHubUsers;
      }
      return [];
    },
  },
  methods: {
     async getData() {
      document.querySelector("input[name='st']").value = ""
      this.pageload = true
      await this.$store.dispatch('searchUsers', {query: this.seachQuery, check: false});
      this.pageload = false
     }
  },
   async mounted() {
      if (this.$route.query?.q) {
      this.seachQuery = this.$route.query.q
      await this.getData()
    }
  },
  watch: {
    "$route" : async function(to, from) {
      if(to.query?.q) {
        this.seachQuery = this.$route.query.q
        await this.getData()
      }
    }
  }
};
</script>

<style scoped>
.search-github-users {
  width: 100%;
  max-width: 100%;
}
.users-container {
  width: 100%;
  padding: 0 3%;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.search-result {
    text-align: center;
    padding: 15px 10px 0 10px;
}
.search-result h1 {
    font-size: 20px;
    font-weight:400;
}
.search-result h2 {
    font-size: 18px;
    font-weight: 400;
}
.search-result span {
   font-weight: 600;
}
.product_loader{
    text-align: center;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
