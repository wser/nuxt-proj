<template lang="pug">
v-app(:dark="$store.state.dark")
  Navbar
  Toolbar
  v-content
    v-container
      nuxt
  NavbarRight
  v-footer(:fixed='$store.state.fixed', app)
    span &copy; 2017
</template>

<script>
import Toolbar from '@/components/Toolbar'
import Navbar from '@/components/Navbar'
import NavbarRight from '@/components/NavbarRight'
  export default {
    components: { Toolbar, Navbar, NavbarRight },
  }
</script>
