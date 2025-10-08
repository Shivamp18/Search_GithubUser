import React, { useState } from 'react'
import ErrorMessage from './components/ErrorMessage'
import UserDetails from './components/UserDetails'

const App = () => {

  const [userName, setUserName] = useState('')
  const [userData, setUserData] = useState('')
  const [error, setError] = useState('')

  const fetchUserData = async (event) => {
    try {
      event.preventDefault();
      setError('')
      const response = await fetch(`https://api.github.com/users/${userName}`)
      console.log(response);
      const data = await response.json()
      setUserData(data)
      console.log(data);
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div className='flex flex-col items-center min-h-screen opacity-85' style={{
      backgroundImage: "url('/GreenLeaves.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
    }}>
      <h1 className='font-bold text-5xl py-12 mt-4 text-white'>Search Github User</h1>
      <form className='flex gap-0.5' onSubmit={fetchUserData}>
        <input type="text"
          value={userName}
          placeholder='Enter Github username'
          onChange={(event) => {
            setUserName(event.target.value)
            setError('')
          }}
          className='border border-gray-300 rounded-l px-4 py-2 bg-white'
        />
        <button className='border border-gray-300 px-4 py-2 bg-green-300 rounded-r cursor-pointer font-semibold'
          type='submit'>Search
        </button>
      </form>

      <ErrorMessage message={error} />
      <UserDetails userData={userData} />

    </div>
  )
}

export default App