import React from 'react'
import { useTheme } from "next-themes"

const LogoTitle = () => {
  const { theme} = useTheme()
  return <>
  {theme === "light" ? <img className='w-[180px]' src="https://doge.bitcoinfiles.org/b5c7ca6b62d39aa696dd901d7cae09f81a7a78dd1692670937859989578ae8ed" /> : <img className='w-[180px]' src="https://doge.bitcoinfiles.org/8d9a9115baa7829ed4aa6e38a1db2267d6f131c030fc0465e672641e76ad9a95"/>}</>
}

export default LogoTitle