<template lang="pug">
section.single-recipe
	h1 {{ recipe.title }}
	div
		img.recipe-image(:src="recipe.thumbnail", :alt="recipe.title") 
	p {{ recipe.descriptionText}}
</template>

<script>
export default {
		asyncData(context){
		// return axios.get()
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					recipe: [
						{
							id: "1",
							title: "Delicious Pizza",
							previewText: "Awesome Pizza!",
							descriptionText:"This is really a delicious meal!",
							thumbnail: "https://www.geek.com/wp-content/uploads/2016/06/pizza_01.jpg"
						},
						{
							id: "2",
							title: "Sea Food Salad",
							previewText: "Very tasty indeed!",
							descriptionText:"This is really a delicious meal!",
							thumbnail: "http://www.festmusikfestmusik.dk/wp-content/uploads/2017/10/food-715539_960_720.jpg"
						},
					].find(el => el.id === context.params.id)
				})
			}, 1500)
		})
	}
}
</script>


<style scoped>
.single-recipe {
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 30px;
}
.recipe-image {
	width:100%;	
	height:400px;
}
</style>
