<template lang="pug">
v-navigation-drawer(:mini-variant='$store.state.miniVariant',
	:clipped='$store.state.clipped',
	v-model='$store.state.drawer',
	fixed app)
	v-list
		v-list-tile(router,
			:to='item.path',
			:key='i',
			v-for='(item, i) in itemz',

			exact)
			v-list-tile-action
				v-icon(v-html='item.icon')
			v-list-tile-content
				v-list-tile-title(v-text="item.name.toUpperCase()") 
				// |{{item.name.toUpperCase()}}
</template>

<script>
	export default {
		data() {
      return {
        icons: [
					// add new icon here (above the first one)
					
          { icon: 'receipt' },
          { icon: 'bubble_chart' },
          { icon: 'home' },
				],
				excluders: ['404', 'recipes-id', 'custom'],
				itemz: []
      }
		},
		mounted(){
			this.getLinks()
		},
		methods: {
			// automaticaly get links for navigation from pages
			getLinks () {

				let o = this.$router.options.routes
				console.log (o)
				let ic = this.icons
				let x = this.excluders
				//removes elements from array o by values from array x
				for (let j = 0; j < x.length; j++) {
					for( let i = o.length; i--;){
						o[i].id = i								// add id to o array
						if (o[i].name === x[j]) o.splice(i, 1)
					}
				}
				// add icons to o array
			 	for (let a = 0; a < o.length; a++) {
					o[a].icon = ic[a].icon
				} 
				//replace index with home
				for (let k = 0; k < o.length; k++) {
					if (o[k].name === 'index') o[k].name = 'home'
				}
				
				// sets the home as id 0
				o.map((item, i) => {
					if (o[i].name === 'home') o[i].id = 0 
					else o[i].id += 1
					return item.id
				})

				// sorts the o array by id atoz
				o.sort((a, b) => {
					if(a.id < b.id) return -1
					if(a.id > b.id) return 1
					return 0
				})
				console.log (o)
				this.itemz = o	
			}
		}
}
</script>

<style scoped>

</style>