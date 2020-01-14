import React from 'react'

const apiMethods = [
  {
    module: 'content',
    name: 'useContent',
  },
  {
    module: 'nav',
    name: 'useNav',
  },
  {
    module: 'users',
    name: 'useUsers',
  },
]

export function createFlamelinkHooks({ flamelinkApp }) {
  if (!flamelinkApp) {
    throw new Error('Please provide a "flamelinkApp" instance')
  }

  return apiMethods.reduce((api, method) => {
    return Object.assign(api, {
      [method.name]({ callback, ...options }, effectResolver = [options]) {
        if (callback) {
          console.warn(
            'Provided "callback" method has no effect and has been ignored'
          )
        }

        const [state, setState] = React.useState({ error: null, data: null })

        React.useEffect(() => {
          return flamelinkApp[method.module].subscribe({
            ...options,
            callback(error, data = null) {
              return setState({ error, data })
            },
          })
        }, effectResolver) // eslint-disable-line react-hooks/exhaustive-deps

        return [state.error, state.data]
      },

      [`${method.name}Once`](options, effectResolver = [options]) {
        const [state, setState] = React.useState({ error: null, data: null })

        React.useEffect(() => {
          ;(async () => {
            try {
              const data = await flamelinkApp[method.module].get(options)
              return setState({ error: null, data })
            } catch (error) {
              return setState({ error, data: null })
            }
          })()
        }, effectResolver) // eslint-disable-line react-hooks/exhaustive-deps

        return [state.error, state.data]
      },
    })
  }, {})
}
