<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary"
     :class="isNavBarFixed ? 'navbar-fixed' : ''">
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
  data() {
    return {
      isNavBarFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scroll = window.scrollY
      scroll > 30 ? this.isNavBarFixed = true : this.isNavBarFixed = false
    }
  }
};
</script>

<style scoped>
.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: top 0.3s;
}
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
