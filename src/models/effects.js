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

      dispatch.breaks.setMessageResponse({
        message: err.response.data.error,
        header: 'Error',
        response: 'error',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 2000)
    }
  },

  // For get user profile or data
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

  // For update user profile or data
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
      dispatch.breaks.setMessageResponse({
        message: err.response.data.error,
        header: 'Error',
        response: 'error',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 2000)
    }
  },

  // For get user profile or data
  async fetchUserBreaktimeList() {
    let token = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.get('/breaktime/me/all-breaks', {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch.breaks.setUserBreaktimeList(response.data.data)
      localStorage.setItem(
        'userBreaktimeList',
        JSON.stringify(response.data.data)
      )
      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      console.log(err)
      dispatch.breaks.setIsFetching(false)
    }
  },

  // For get user current breaktime
  async fetchUserCurrentBreaktime(id) {
    let token = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetching(true)
      let response = await breakURL.get(`/breaktime/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch.breaks.setCurrentBreaktime(response.data.data)

      dispatch.breaks.setIsFetching(false)
    } catch (err) {
      console.log(err)
      dispatch.breaks.setIsLoadingData(false)
    }
  },

  // For Create User or Register user
  async registerUser(payload) {
    try {
      dispatch.breaks.setFormIsLoading(true)
      await breakURL.post('/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      dispatch.breaks.setMessageResponse({
        message: 'Successfully register',
        header: 'Success',
        response: 'positive',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 2000)

      dispatch.breaks.setFormIsLoading(false)
    } catch (err) {
      dispatch.breaks.setFormIsLoading(false)
      dispatch.breaks.setMessageResponse({
        message: err.response.data,
        header: 'Error',
        response: 'error',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 2000)
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
      console.log(err)
    }
  },

  // For get single users(Admin side)
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
      console.log(err)
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
      console.log(err)
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
      dispatch.breaks.setIsFetchingButton(true)
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
      dispatch.breaks.setIsFetchingButton(false)
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
      dispatch.breaks.setFormResponse(response.data)
      dispatch.breaks.setMessageResponse({
        message: 'Successfully create break',
        header: 'Success',
        response: 'positive',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 3000)
      dispatch.breaks.setFormIsLoading(false)
    } catch (err) {
      dispatch.breaks.setFormIsLoading(false)
      dispatch.breaks.setMessageResponse({
        message: err.response.data.error,
        header: 'Error',
        response: 'error',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 3000)
    }
  },

  // For Break Update
  async updateBreak(payload, state) {
    let loginUser = localStorage.getItem('token')
    let { selectedBreak } = state.breaks

    try {
      dispatch.breaks.setFormIsLoading(true)
      await breakURL.put(`/breaks/${selectedBreak._id}`, payload, {
        headers: {
          Authorization: `Bearer ${loginUser}`,
          'Content-Type': 'application/json',
        },
      })
      dispatch.breaks.setSelectedBreak(null)
      history.push('/view-all-break')
      dispatch.breaks.setMessageResponse({
        message: 'Successfully edit break',
        header: 'Success',
        response: 'positive',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 3000)
    } catch (err) {
      dispatch.breaks.setFormIsLoading(false)
      dispatch.breaks.setMessageResponse({
        message: err.response.data.error,
        header: 'Error',
        response: 'error',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 3000)
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
      dispatch.breaks.setFormResponse(response.data)
      dispatch.breaks.setMessageResponse({
        message: 'Successfully delete break',
        header: 'Success',
        response: 'positive',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 3000)
      dispatch.breaks.setIsFetching(false)
      history.push('/view-all-break')
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      dispatch.breaks.setMessageResponse({
        message: err.response.data.error,
        header: 'Error',
        response: 'error',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 3000)
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
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      console.log(err)
    }
  },

  // For Breaktime create
  async createBreaktime(payload) {
    let loginUser = localStorage.getItem('token')
    try {
      dispatch.breaks.setIsFetchingButton(true)
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
      dispatch.breaks.setIsFetchingButton(false)
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      console.log(err.response.data.error)
    }
  },
  async endBreaktime(payload) {
    let loginUser = localStorage.getItem('token')

    try {
      dispatch.breaks.setIsFetchingButton(true)
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
        dispatch.breaks.setCurrentBreaktime(null)
      }
      if (response.data.data.minsLate && response.data.data.overbreak) {
        dispatch.breaks.setMessageResponse({
          message: `You are ${response.data.data.minsLate} mins late in your ${response.data.data.breakname} break`,
          header: 'Warning',
          response: 'warning',
        })
        await setTimeout(() => {
          dispatch.breaks.setMessageResponse(null)
        }, 3000)
      }

      dispatch.breaks.setIsFetching(false)
      dispatch.breaks.setIsFetchingButton(false)
    } catch (err) {
      dispatch.breaks.setIsFetching(false)
      dispatch.breaks.setMessageResponse({
        message: err.response.data.error,
        header: 'Error',
        response: 'error',
      })
      await setTimeout(() => {
        dispatch.breaks.setMessageResponse(null)
      }, 2000)
    }
  },
})
