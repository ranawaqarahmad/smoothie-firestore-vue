<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'HomeView' }">
          <span class="nav-title">Ninja Smooties</span>
        </router-link>
        <a href="" class="btn-floating halfway-fab pink btn-large">
          <router-link :to="{ name: 'AddSmoothie' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>
