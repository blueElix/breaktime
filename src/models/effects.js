import breakURL from '../apis/break'
import history from '../history'

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

  // For get user profile or data
  async fetchUserData() {
    let token = localStorage.getItem('token')
    try {
      let response = await breakURL.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch.breaks.setUserData(response.data.data)
      localStorage.setItem('userData', JSON.stringify(response.data.data))
    } catch (err) {
      console.log(err)
    }
  },

  // For get user profile or data
  async updateUserData(payload) {
    let token = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsLoadingData(true)
      let response = await breakURL.put('/auth/updatedetails', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch.breaks.setUserData(response.data.data)
      localStorage.setItem('userData', JSON.stringify(response.data.data))
      dispatch.breaks.setIsLoadingData(false)
      history.push('/view-profile')
    } catch (err) {
      dispatch.breaks.setIsLoadingData(false)
      console.log(err)
    }
  },

  // For Create User or Register user
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

  // For get all users(Admin side)
  async fetchAllUsers() {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetchingUser(true)
      let response = await breakURL.get('/auth/users', {
        headers: { Authorization: `Bearer ${loginUser}` },
      })
      dispatch.breaks.setAllUsers(response.data.data)
      dispatch.breaks.setIsFetchingUser(false)
    } catch (err) {
      dispatch.breaks.setIsFetchingUser(false)
      // alert(err.response.data.error);
    }
  },

  // For get all users(Admin side)
  async fetchSingleUser(id) {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetchingUser(true)
      let response = await breakURL.get(`/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${loginUser}` },
      })
      dispatch.breaks.setSingleUser(response.data.data)
      dispatch.breaks.setIsFetchingUser(false)
    } catch (err) {
      dispatch.breaks.setIsFetchingUser(false)
      alert(err.response.data.error)
    }
  },

  // For get Single user Breaktime
  async fetchSingleUserBreaktime(id) {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetchingUser(true)
      let response = await breakURL.get(`/breaktime?user=${id}`, {
        headers: { Authorization: `Bearer ${loginUser}` },
      })
      dispatch.breaks.setUserBreaktime(response.data.data)
      dispatch.breaks.setIsFetchingUser(false)
    } catch (err) {
      dispatch.breaks.setIsFetchingUser(false)
      alert(err.response.data.error)
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

  // Fetch all allowed breaks
  async fetchAllowedBreaks() {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.get('/breaks/me/allowed-breaks', {
        headers: {
          Authorization: `Bearer ${loginUser}`,
          'Content-Type': 'application/json',
        },
      })
      dispatch.breaks.setAllowedBreakList(response.data.data)
      localStorage.setItem(
        'allowedBreakList',
        JSON.stringify(response.data.data)
      )
      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      console.log(err)
      dispatch.breaks.setIsFetching(false)
    }
  },

  // Fetch Single break

  async fetchSelectedBreak(breakId) {
    try {
      dispatch.breaks.setBreakIsFetching(true)
      let response = await breakURL.get(`/breaks/${breakId}`)
      dispatch.breaks.setSelectedBreak(response.data.data)
      localStorage.setItem('selectedBreak', JSON.stringify(response.data.data))
      dispatch.breaks.setBreakIsFetching(false)
    } catch (err) {
      console.log(err)
      dispatch.breaks.setBreakIsFetching(false)
    }
  },
  // Create Break
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

  // For Break Update
  async updateBreak(id, payload) {
    let loginUser = localStorage.getItem('token')
    let data = payload.form.breakForm.values

    try {
      dispatch.breaks.setFormIsLoading(true)
      let response = await breakURL.put(`/breaks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${loginUser}`,
          'Content-Type': 'application/json',
        },
      })
      dispatch.breaks.setBreakDataResponse(response.data)
      dispatch.breaks.setFormIsLoading(false)
    } catch (err) {
      dispatch.breaks.setFormIsLoading(false)
      dispatch.breaks.setBreakDataResponse(err.response.data.error)
    }
  },

  // For Break Delete
  async deleteBreak(id) {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.delete(`/breaks/${id}`, {
        headers: {
          Authorization: `Bearer ${loginUser}`,
          'Content-Type': 'application/json',
        },
      })
      dispatch.breaks.setBreakDataResponse(response.data)
      dispatch.breaks.setIsFetching(false)
      history.push('/view-all-break')
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      dispatch.breaks.setBreakDataResponse(err.response.data.error)
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
  // Fetch All breaktime by signed in user
  async fetchUserBreakTime() {
    let loginUser = localStorage.getItem('token')
    try {
      let response = await breakURL.get('/breaktime/me/breaks', {
        headers: {
          Authorization: `Bearer ${loginUser}`,
        },
      })

      dispatch.breaks.setmyBreaktime(response.data.data)
      // localStorage.setItem('breaktime', JSON.stringify(response.data.data));
      // dispatch.breaks.setIsFetching(false);
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      console.log(err)
      //alert(err.response.data.error)
    }
  },

  // For Breaktime create
  async createBreaktime(payload) {
    console.log(payload, 'creare breaktime')
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.post('/breaktime', payload, {
        headers: { Authorization: `Bearer ${loginUser}` },
      })

      if (response.data.success) {
        dispatch.breaks.fetchAllowedBreaks()
        dispatch.breaks.fetchUserData()
        dispatch.breaks.fetchUserBreakTime()
      }

      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      console.log(err.response.data.error)
    }
  },
  async endBreaktime(payload) {
    console.log(payload, 'should be id of current breaktime')
    let loginUser = localStorage.getItem('token')

    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.put(
        `/breaktime/${payload}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${loginUser}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.data.success) {
        dispatch.breaks.fetchUserData()
        dispatch.breaks.fetchAllowedBreaks()
        dispatch.breaks.fetchUserBreakTime()
      }
      if (response.data.data.minsLate && response.data.data.overbreak) {
        alert(
          `You are ${response.data.data.minsLate} mins late in your ${response.data.data.breakname} break`
        )
      }

      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      dispatch.breaks.setIsFetching(false)

      alert(err.response.data.error)
    }
  },
})
