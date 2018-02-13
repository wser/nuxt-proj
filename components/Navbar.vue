<template lang="pug">
v-navigation-drawer(:mini-variant='$store.state.miniVariant',
	:clipped='$store.state.clipped',
	v-model='$store.state.drawer',
	fixed app)
	v-list
		v-list-tile(router,
			:to='item.to',
			:key='i',
			v-for='(item, i) in items',
			exact)
			v-list-tile-action
				v-icon(v-html='item.icon')
			v-list-tile-content
				v-list-tile-title(v-text='item.title')
</template>

<script>
	export default {
		data() {
      return {
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
      }
		}		
	}
</script>

<style scoped>

</style>