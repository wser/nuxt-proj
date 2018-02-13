import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
			drawer: false,
			miniVariant: false,
			clipped: false,
			fixed: false,
			rightDrawer: false,
			right: true
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
      }
    }
  })
}

export default createStore