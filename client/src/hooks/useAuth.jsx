import React, { useContext, useEffect, useState } from 'react'
import { loginUser, registerUser } from '../services/auth-services.js'
import Cookies from 'js-cookie'

// Suport for two types of user data storage
export const StorageTypes = {
  LOCAL_STORAGE: 0,
  COOKIE: 1,
}

// Name for the data object saved in storage
const infoName = 'authdata'

// Global context
const AuthContext = React.createContext()

// Read user data from storage
function getAuthenticationData(storageType) {
  if (storageType === StorageTypes.LOCAL_STORAGE) {
    return localStorage.getItem(infoName) || null
  } else {
    return Cookies.get(infoName) || null
  }
}

// Save user data to storage
function setAuthenticationData(storageType, data) {
  if (storageType === StorageTypes.LOCAL_STORAGE) {
    return localStorage.setItem(infoName, data)
  } else {
    return Cookies.set(infoName, data, { expires: 365 })
  }
}

// Removes user data from storage
function removeAuthenticationData(storageType) {
  if (storageType === StorageTypes.LOCAL_STORAGE) {
    return localStorage.removeItem(infoName)
  } else {
    return Cookies.remove(infoName)
  }
}

// Main authentication provider implementation. The params
// are children app and storage type (localstorage or cookie)
export function AuthProvider({ children, storageType }) {
  const [user, setUser] = useState(getAuthenticationData(storageType))

  // If it can reads user data, checks the expiration date from database
  // If date has expired, removes the info. If not, stores user state
  useEffect(() => {
    const storedUser = getAuthenticationData(storageType)

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)

      const expirationTimestamp = new Date(parsedUser.expiration).getTime()
      const nowTimestamp = new Date().getTime()

      if (nowTimestamp > expirationTimestamp) {
        removeAuthenticationData(storageType)
        setUser(null)
      } else {
        setUser(parsedUser)
      }
    }
  }, [])

  // Calls backend API for login. If login successfully, stores user data in state
  // and creates storage object for mantain session opened until close or expired
  async function login(username, password) {
    try {
      const loginResponse = await loginUser(username, password)

      if (loginResponse.ok) {
        // Compose avatar full path
        loginResponse.body.avatar = loginResponse.body.avatar
          ? loginResponse.body.avatarurl + loginResponse.body.avatar
          : ''

        const userData = {
          id: loginResponse.body.id,
          message: loginResponse.body.message,
          username: loginResponse.body.username,
          admin: loginResponse.body.admin,
          disabled: loginResponse.body.disabled,
          expiration: loginResponse.body.expiration,
          avatar: loginResponse.body.avatar,
        }

        // Update user info
        setAuthenticationData(storageType, JSON.stringify(userData))
        setUser(userData)
      }

      return { ok: loginResponse.ok, message: loginResponse.body.message }
    } catch (err) {
      return {
        ok: false,
        message: String(err),
      }
    }
  }

  // Calls backend API for registration. User info isn't stored until Login
  async function register(username, password) {
    try {
      const registerResponse = await registerUser(username, password)

      return { ok: registerResponse.ok, message: registerResponse.body.message }
    } catch (err) {
      return {
        ok: false,
        message: String(err),
      }
    }
  }

  // Close session. Removes user data from state and from storage.
  function logout() {
    removeAuthenticationData(storageType)
    setUser(null)
  }

  // Updates user data, in storage and global state
  function updateUserData(userData) {
    setAuthenticationData(storageType, JSON.stringify(userData))
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{ user, updateUserData, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// The custom hook function we should use
export function useAuth() {
  return useContext(AuthContext)
}
