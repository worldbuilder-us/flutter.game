
import { useEffect, useState } from 'react'

import { HasteClient } from '@hastearcade/web'

export function useHaste() {

  const [hasteAuth, setHasteAuth] = useState()

  const [haste, setHaste] = useState()

  const [tokenDetails, setTokenDetails] = useState()

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {

    if (!haste) {
        setHaste(HasteClient.build())
    }

    if (haste) {
        
        setTokenDetails(haste.getTokenDetails())

        if (tokenDetails && tokenDetails.isAuthenticated) {
            localStorage.setItem('hasteAuth', tokenDetails)
            setAuthenticated(true)
        }
    }

  }, [haste])

  async function login() {

    haste.login()

    const tokenDetails = haste.getTokenDetails()

    if (tokenDetails && tokenDetails.isAuthenticated) {
        setAuthenticated(true)
    }

    setHasteAuth(tokenDetails)
    
  }

  function logout() {
    console.log("haste.logout")
    haste.logout()
    setHasteAuth(null)
    setAuthenticated(false)
  }

  return {login, logout, haste, tokenDetails, authenticated};

}