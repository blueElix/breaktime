import { init } from '@rematch/core'
import * as models from '../models'
import { reducer as formReducer } from 'redux-form'

export const store = init({
  models,
  redux: {
    reducers: {
      form: formReducer,
    },
  },
})
