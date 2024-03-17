<template>
  <div class="user">
    <div class="user-image">
      <img :src="userImage" :alt="userLogin" :name="userLogin" />
    </div>
    <div class="user-detail">
      <p>
        GitHub Login: <span>{{ userLogin }}</span>
      </p>
      <p>
        GitHub ID: <span>{{ userId }}</span>
      </p>
      <!-- <Nuxt-link :to="userUrl">Go To GitHub Account</Nuxt-link> -->
      <a :href="userUrl" target="_blank" rel="noopener noreferrer">
        Go To GitHub Account
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: ['userLogin', 'userImage', 'userId', 'userUrl']
};
</script>

<style scoped>
 .user {
  flex: 0 0 25%;
  height: auto;
  max-width: 25%;
  padding: 10px;
}
.user .user-image img {
  width: 100%;
}
.user .user-image {
  min-height: 176px;
}
.user p {
  margin-bottom: 1px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}
.user p span {
  font-weight: 300;
}
.user a{
  font-size: 13px;
  text-decoration: none;
  color: #000;
}
.user a:hover{
  color: #36c2dd;
}
 @media screen and (max-width: 767px) {
   .user {
    flex: 0 0 50%;
    max-width: 50%;
  }
  
 }
</style>
