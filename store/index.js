import axios from "axios";
export const state = () => ({
  serchWord: ""
})

export const getters = {
  getterPosts: state => {
    return state.serchWord
  }
}

export const mutations = {
  setSerchWord: (state, data) => {
    console.log(data)
    state.serchWord = data
  }
}

export const actions = {
}