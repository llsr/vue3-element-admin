import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '../index'

// 定义app里state类型
export interface ICountState {
  count: number;
}

// 定义mutations
const mutations: MutationTree<ICountState> = {
  ADD_COUNt(state) {
    state.count++
  }
}

// 定义actions
const actions: ActionTree<ICountState, IRootState> = {
  addCount({ commit }) {
    commit('ADD_COUNt')
  }
}

// 定义module
const app: Module<ICountState, IRootState> = {
  namespaced: true,
  state: {
    count: 0
  },
  mutations,
  actions
}

export default app
