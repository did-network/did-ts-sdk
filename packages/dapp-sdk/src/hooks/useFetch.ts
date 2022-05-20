import useSWR from 'swr'

const getFetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

const postFetcher = async (url: string, formData?: any) => {
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  return res.json()
}

/***
 useFetch('/user', 'get', { name: 'tony' }, { refreshInterval: 1000 })
 */
export function useFetch<T>(path: string | null | undefined, method: 'post' | 'get' = 'get', params: any = undefined, options: any = undefined) {
  const isGet = method === 'get'
  const url = (isGet && params) ? `${path}?${new URLSearchParams(params).toString()}` : path

  const key = isGet ? url : [url, params]
  const fetcher = isGet ? getFetcher : postFetcher

  const { data, error } = useSWR<T>(path ? key : null, fetcher, options)
  return {
    data,
    error,
  }
}
