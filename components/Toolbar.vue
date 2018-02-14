<template lang="pug">
v-toolbar(fixed, app, :clipped-left='$store.state.clipped')
	v-toolbar-side-icon(@click.stop="$store.commit('setDrawer')")
	v-btn(icon, @click.stop="$store.commit('setMiniVariant')")
		v-icon(v-html="$store.state.miniVariant ? 'chevron_right' : 'chevron_left'")
	v-btn(icon, @click.stop="$store.commit('setClipped')")
		v-icon web
	v-btn(icon, @click.stop="$store.commit('setFixed')")
		v-icon(v-html="$store.state.fixed ? 'remove' : 'linear_scale'")
	div.mx-2(@click.stop="$store.commit('setDark')")
		v-switch(	v-model='dark')
	v-spacer
	v-toolbar-title(v-text='title')
	v-spacer
	v-btn(icon, @click.stop="$store.commit('setRightDrawer')")
		v-icon menu
</template>

<script>
	export default {
		data() {
      return {
				title: 'Vuetify.js',
				dark: false,
      }
		}
	}
</script>

<style scoped>

</style>