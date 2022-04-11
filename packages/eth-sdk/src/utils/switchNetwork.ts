export default async function switchNetwork(i: number) {
  if (window.ethereum && window.ethereum.request) {
    try {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + i.toString(16) }],
      })
    } catch (error) {
      console.error(error)
    }
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 100)
  })
}
