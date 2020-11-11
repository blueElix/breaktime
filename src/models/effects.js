import breakURL from '../apis/break'

export default (dispatch) => ({
  // For Users
  async fetchLoginUser(payload) {
    try {
      dispatch.breaks.setIsLoading(true)
      let response = await breakURL.post('/auth/login', payload)
      dispatch.breaks.setLoginUser(response.data)
      localStorage.setItem('token', response.data.token)
      await setTimeout(() => {
        dispatch.breaks.setIsLoading(false)
      }, 2000)
    } catch (err) {
      dispatch.breaks.setIsLoading(false)
      alert(err.response.data.error)
    }
  },

  async fetchUserData() {
    let token = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsLoadingData(true)
      let response = await breakURL.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch.breaks.setUserData(response.data.data)
      localStorage.setItem('userData', JSON.stringify(response.data.data))
      dispatch.breaks.setIsLoadingData(false)
    } catch (err) {
      console.log(err)
      dispatch.breaks.setIsLoadingData(false)
    }
  },

  async registerUser(payload) {
    try {
      dispatch.breaks.setFormIsLoading(true)
      let response = await breakURL.post('/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      dispatch.breaks.setRegisterUser(response.data)
      dispatch.breaks.setFormIsLoading(false)
    } catch (err) {
      dispatch.breaks.setIsLoading(false)
      dispatch.breaks.setFormIsLoading(err.response.data)
    }
  },

  // For Break

  // Fetch all breaks
  async fetchBreak() {
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.get('/breaks')
      dispatch.breaks.setBreakList(response.data.data)
      localStorage.setItem('breakList', JSON.stringify(response.data.data))
      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      console.log(err)
      dispatch.breaks.setIsFetching(false)
    }
  },

  async createBreak(payload) {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setFormIsLoading(true)
      let response = await breakURL.post('/breaks', payload, {
        headers: {
          Authorization: `Bearer ${loginUser}`,
          'Content-Type': 'application/json',
        },
      })
      dispatch.breaks.setBreakDataResponse(response.data)
      dispatch.breaks.setFormIsLoading(false)
    } catch (err) {
      dispatch.breaks.setFormIsLoading(false)
      dispatch.breaks.setBreakDataResponse(err.response.data)
    }
  },
  async updateBreak(id, payload) {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setFormIsLoading(true)
      let response = await breakURL.put(`/breaks${id}`, payload, {
        headers: {
          Authorization: `Bearer ${loginUser}`,
          'Content-Type': 'application/json',
        },
      })
      dispatch.breaks.setBreakDataResponse(response.data)
      dispatch.breaks.setFormIsLoading(false)
    } catch (err) {
      dispatch.breaks.setFormIsLoading(false)
      dispatch.breaks.setBreakDataResponse(err.response.data)
    }
  },

  // For Breaktime

  async fetchBreakTime() {
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.get('/breaktime')
      dispatch.breaks.setBreaktime(response.data.data)
      localStorage.setItem('breaktime', JSON.stringify(response.data.data))
      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      console.log(err)
      //alert(err.response.data.error)
    }
  },
  // For Breaktime create
  async createBreaktime(payload) {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.post('/breaktime', payload, {
        headers: { Authorization: `Bearer ${loginUser}` },
      })
      dispatch.breaks.setCurrentBreaktime(response.data.data)
      localStorage.setItem(
        'currentBreaktime',
        JSON.stringify(response.data.data)
      )
      dispatch.breaks.setIsOnBreak(true)
      localStorage.setItem('isOnBreak', true)
      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      alert(err.response.data.error)
    }
  },
  async endBreaktime(payload, state) {
    let breaktimeStorage = localStorage.getItem('currentBreaktime')
    let breaktimeId = JSON.parse(breaktimeStorage)
    let loginUser = localStorage.getItem('token')
    if (!breaktimeId) {
      breaktimeId = state.breaks.currentBreaktime
    }

    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.put(
        `/breaktime/${breaktimeId._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${loginUser}`,
            'Content-Type': 'application/json',
          },
        }
      )
      dispatch.breaks.setIsOnBreak(false)
      localStorage.setItem('isOnBreak', false)
      localStorage.setItem('currentBreaktime', '')
      dispatch.breaks.setCurrentBreaktime(response.data)
      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      console.log(err)
      //alert(err.response.data.error)
    }
  },
})
