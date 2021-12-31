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

export function useFetch<T>(url: string, method: 'post' | 'get' = 'get', form: any = undefined) {
  const fetcher = method === 'get' ? getFetcher : postFetcher
  const { data, error } = useSWR<T>(form ? [url, form] : url, fetcher)
  return {
    data,
    error,
  }
}
