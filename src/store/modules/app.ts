import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '../index'

// 定义app里state类型
export interface IAppState {
  sidebar: {
    opened: boolean;
    num: number;
  };
}

// 定义mutations
const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened
  }
}

// 定义actions
const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

// 定义module
const app: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      num: 2
    }
  },
  mutations,
  actions
}

export default app
