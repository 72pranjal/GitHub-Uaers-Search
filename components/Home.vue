<template>
  <div class="home-page row">
    <h3 v-if="$store.state.apiError">{{ $store.state.apiError }}</h3>
    <div>
      <p>
        => Here, you can search for a user's name and check if they have a
        GitHub account.
      </p>
      <p>
        => As you type a name into the search box, search results will appear
        after entering just one character.
      </p>
      <p>
        => After receiving auto-suggested user names, you can proceed to search
        by either pressing the Enter key in the search field or clicking on the
        "Go to search page" button.
      </p>

      <p>
        => If you found status code 403 from api Please close existing tab and
        open in another tab
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home-page {
  padding: 3% 6%;
  text-align: left;
}
.home-page p {
    font-size: 18px;
    font-weight: 500;
}
</style>
