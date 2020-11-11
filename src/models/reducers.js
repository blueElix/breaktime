export default {
  // For users
  setUsers(state, payload) {
    return { ...state, users: payload }
  },
  setSelectedUser(state, payload) {
    return { ...state, selectedUser: payload }
  },
  setLoginUser(state, payload) {
    return { ...state, loginUser: payload }
  },
  setRegisterUser(state, payload) {
    return { ...state, registerUserData: payload }
  },
  setUserData(state, payload) {
    return { ...state, userData: payload }
  },

  // For Break
  setBreakList(state, payload) {
    return { ...state, breakList: payload }
  },
  setSelectedBreak(state, payload) {
    return { ...state, selectedBreak: payload }
  },
  setBreakDataResponse(state, payload) {
    return { ...state, breakDataResponse: payload }
  },
  setIsOnBreak(state, payload) {
    return { ...state, isOnBreak: payload }
  },

  // For Breaktime
  setBreaktime(state, payload) {
    return { ...state, breaktime: payload }
  },
  setCurrentBreaktime(state, payload) {
    return { ...state, currentBreaktime: payload }
  },

  // For Loading
  setIsLoading(state, payload) {
    return { ...state, isLoading: payload }
  },
  setIsLoadingData(state, payload) {
    return { ...state, isLoadingData: payload }
  },
  setIsFetching(state, payload) {
    return { ...state, isFetching: payload }
  },
  setFormIsLoading(state, payload) {
    return { ...state, isFormLoading: payload }
  },
}
