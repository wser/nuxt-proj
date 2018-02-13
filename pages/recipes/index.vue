<template lang="pug">
	section.recipes
		Recipe(
			v-for="recipe in recipes",
			:key="recipe.id"
			:thumbnail='recipe.thumbnail',
			:title="recipe.title",
			:id='recipe.id',
			:previewText="recipe.previewText")
</template>

<script>
import Recipe from '@/components/Recipe'
export default {
	components: { 
		Recipe 
	},
	asyncData(){
		// return axios.get()
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					recipes: [
						{
							id: "1",
							title: "Delicious Pizza",
							previewText: "Awesome Pizza!",
							thumbnail: "https://www.geek.com/wp-content/uploads/2016/06/pizza_01.jpg"
						},
						{
							id: "2",
							title: "Sea Food Salad",
							previewText: "Very tasty indeed!",
							thumbnail: "http://www.festmusikfestmusik.dk/wp-content/uploads/2017/10/food-715539_960_720.jpg"
						},

					]
				})
			}, 1500)
		})
	}
}
</script>

<style scoped>
.recipes{
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
}
</style>