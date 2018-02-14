import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
			drawer: true,
			miniVariant: false,
			clipped: false,
			fixed: false,
			rightDrawer: false,
			right: true,
			dark: false
    },
    mutations: {
      setDrawer (state) {
				state.drawer = !state.drawer
			//	console.log(state.drawer)
      },
      setMiniVariant (state) {
				state.miniVariant = !state.miniVariant
			//	console.log(state.miniVariant)
      },
      setClipped (state) {
				state.clipped = !state.clipped
			//	console.log(state.clipped)
			},
			setFixed (state) {
				state.fixed = !state.fixed
			//	console.log(state.fixed)
			},
			setRightDrawer (state) {
				state.rightDrawer = !state.rightDrawer
			//	console.log(state.rightDrawer)
      },
			setRight (state) {
				state.right = !state.right
			//	console.log(state.right)
			},
			setDark(state) {
				state.dark = !state.dark
			//	console.log(state.dark)
			}
    }
  })
}

export default createStore