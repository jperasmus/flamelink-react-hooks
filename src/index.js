import { useState, useEffect } from 'react'

export const createFlamelinkHooks = function({ flamelinkApp }) {
  if (!flamelinkApp) {
    throw new Error('Please provide a "flamelinkApp" instance')
  }

  const apiMethods = [
    {
      module: 'content',
      name: 'useContent',
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

        const [error, setError] = useState(null)
        const [data, setSuccess] = useState(null)

        useEffect(() => {
          return flamelinkApp[method.module].subscribe({
            ...options,
            callback(err, res) {
              if (err) {
                setContent(null)
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
        const [error, setError] = useState(null)
        const [data, setSuccess] = useState(null)

        useEffect(() => {
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
