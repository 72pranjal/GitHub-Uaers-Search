<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">InMotion Task</a>
        <div class="form-inline search-form active" id="search-id">
          <input
            ref="searchControl"
            class="form-control mr-sm-2 searchbarfontSize"
            autocomplete="off"
            id="search"
            name="st"
            value=""
            type="text"
            placeholder="Search GitHub Users...."
          />
        </div>
      </div>
    </nav>

    <div class="suggested-item">
      <SuggestedData />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.form-inline {
    width: 60%;
    position: relative;
}
 @media screen and (max-width: 767px) {
  .form-inline {
    width: 100%;
  }
 }
</style>
