import React from 'react'

export const createFlamelinkHooks = function({ flamelinkApp }) {
  if (!flamelinkApp) {
    throw new Error('Please provide a "flamelinkApp" instance')
  }

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

  return apiMethods.reduce((api, method) => {
    return Object.assign(api, {
      [method.name]({ callback, ...options }, effectResolver = [options]) {
        if (callback) {
          console.warn(
            'Provided "callback" method has no effect and has been ignored'
          )
        }

        const [error, setError] = React.useState(null)
        const [data, setSuccess] = React.useState(null)

        React.useEffect(() => {
          return flamelinkApp[method.module].subscribe({
            ...options,
            callback(err, res) {
              if (err) {
                setSuccess(null)
                return setError(err)
              }

              setError(null)
              return setSuccess(res)
            },
          })
        }, effectResolver) // eslint-disable-line react-hooks/exhaustive-deps

        return [error, data]
      },

      [`${method.name}Once`](options, effectResolver = [options]) {
        const [error, setError] = React.useState(null)
        const [data, setSuccess] = React.useState(null)

        React.useEffect(() => {
          flamelinkApp[method.module]
            .get(options)
            .then(res => {
              setError(null)
              setSuccess(res)
            })
            .catch(err => {
              setSuccess(null)
              setError(err)
            })
        }, effectResolver) // eslint-disable-line react-hooks/exhaustive-deps

        return [error, data]
      },
    })
  }, {})
}
