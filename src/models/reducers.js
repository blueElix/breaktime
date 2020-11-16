export default {
  // For users
  setUsers(state, payload) {
    return { ...state, users: payload };
  },
  setSelectedUser(state, payload) {
    return { ...state, selectedUser: payload };
  },
  setLoginUser(state, payload) {
    return { ...state, loginUser: payload };
  },
  setRegisterUser(state, payload) {
    return { ...state, registerUserData: payload };
  },
  setUserData(state, payload) {
    return { ...state, userData: payload };
  },
  setAllUsers(state, payload) {
    return { ...state, allUsers: payload }
  },
  setSingleUser(state, payload) {
    return { ...state, singleUser: payload }
  },
  setUserBreaktime(state, payload) {
    return { ...state, userBreaktime: payload }
  },
  setIsFetchingUser(state, payload) {
    return { ...state, isFetchingUser: payload }
  },

  // For Break
  setBreakList(state, payload) {
    return { ...state, breakList: payload };
  },
  setSelectedBreak(state, payload) {
    return { ...state, selectedBreak: payload };
  },
  setBreakDataResponse(state, payload) {
    return { ...state, breakDataResponse: payload };
  },
  setIsOnBreak(state, payload) {
    return { ...state, isOnBreak: payload };
  },

  // For Breaktime
  setBreaktime(state, payload) {
    return { ...state, breaktime: payload };
  },
  setmyBreaktime(state, payload) {
    return { ...state, myBreaktime: payload };
  },
  setCurrentBreaktime(state, payload) {
    return { ...state, currentBreaktime: payload };
  },
  setBreaktimeTaken(state, payload) {
    return { ...state, breaktimeTaken: payload };
  },

  // For Loading
  setIsLoading(state, payload) {
    return { ...state, isLoading: payload };
  },
  setIsLoadingData(state, payload) {
    return { ...state, isLoadingData: payload };
  },
  setIsFetching(state, payload) {
    return { ...state, isFetching: payload };
  },
  setBreakIsFetching(state, payload) {
    return { ...state, isBreakFetching: payload }
  },
  setFormIsLoading(state, payload) {
    return { ...state, isFormLoading: payload };
  },
};
