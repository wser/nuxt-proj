<template lang="pug">
v-navigation-drawer(
	temporary,
	:right='$store.state.right', 
	v-model='$store.state.rightDrawer', 
	fixed)
	v-list
		v-list-tile(@click.native="$store.commit('setRight')")
			v-list-tile-action
				v-icon(light) compare_arrows
			v-list-tile-title Switch drawer (click me)
</template>

<script>
	export default {
		data() {
      return {
      }
		}
	}
</script>

<style scoped>

</style>