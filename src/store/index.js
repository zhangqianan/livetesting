import { createStore } from 'vuex'

//创建一个新的store实例
const store = createStore({
  state() {
    return {
      message: '这里是提示信息',
      code: 1016
    }
  },
  mutations: {
    changeMessage(state, val) {
      state.message = val;
    },
    changeCode(state, val) {
      state.code = val;
    }
  },
  actions: {
    changeMessage(context, val) {
      context.commit('changeMessage', val);
    }
  }
})

export default store;
