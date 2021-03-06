import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signUpWithEmailPassword } from '../../Firebase/firebaseFunctions'
import { AuthContext } from '../../Context/AuthProvider'

const SignUp = () => {
  let history = useHistory()
  const { register, handleSubmit } = useForm()
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const onSubmit = (data) => {
    console.log(data)
    signUpWithEmailPassword(
      data.email,
      data.password,
      data.name,
      setCurrentUser,
      history
    )
  }

  return (
    <div className='mt-10 w-2/5 m-auto text-center '>
      <h1 className=' text-2xl my-10'>SignUp to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='block text-md mb-2'>Name</label>
        <input
          placeholder='name'
          className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
          {...register('name', { required: true })}
        />
        <br />
        <label className='block text-md mt-3 mb-2'>Email</label>
        <input
          placeholder='email'
          className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
          {...register('email', { required: true })}
        />
        <br />
        <label className='block text-md mt-3 mb-2'>Password</label>
        <input
          type='password'
          placeholder='password'
          className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
          {...register('password', { required: true })}
        />
        <br />
        <label className='block text-md mt-3 mb-2'>Confirm Password</label>
        <input
          type='password'
          placeholder='Confirm Password'
          className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
          {...register('password2', { required: true })}
        />
        <br />

        <input
          className='relative ring-2 px-4 mt-6 border rounded-md py-2 text-lg text-white bg-green-600 hover:bg-green-200'
          type='submit'
        />
      </form>

      <Link to='/login'>
        <button className='mt-6'> have an account? Login Now!</button>
      </Link>
    </div>
  )
}

export default SignUp
