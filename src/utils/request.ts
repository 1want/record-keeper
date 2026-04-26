import axios, { type AxiosRequestConfig, type Canceler } from 'axios'

const pending = new Map<string, Canceler>()

const addPending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, JSON.stringify(config.data)].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

const removePending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, JSON.stringify(config.data)].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)!
    cancel(url)

    pending.delete(url)
  }
}

function request<T = any>(option: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API,
      method: option.method,
      timeout: 100000
    })

    instance.interceptors.request.use(
      config => {
        removePending(config)
        addPending(config)
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )

    instance.interceptors.response.use(
      response => {
        removePending(response.config)
        if (response.data.code !== 200) {
          ElMessage({ message: response.data.message, type: 'error' })
          return Promise.reject(response.data)
        }

        return response
      },
      err => {
        return Promise.reject(err)
      }
    )

    instance(option)
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        console.log(err)
      })
  })
}
export default request
