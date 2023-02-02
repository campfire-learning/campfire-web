'use client'

import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { SubmitLogin } from '../../api/login';
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { ErrorAlert } from 'components/alert/ErrorAlert';
import { LoadingIcon } from 'components/assets/LoadingIcon';
import { GenericButtonStyle } from 'components/button/GenericButtonStyle';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [signInLoading, setSignInLoading] = useState(false);

  const router = useRouter();

  console.log(`institution is - ${institution}`);
  const loginMutation = useMutation({
    mutationFn: SubmitLogin,
    onMutate: () => {
      setSignInLoading(true)
    },
    onSuccess: (resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      
      router.push(`/${resp.data.institution_slug}`);
    },
    onError: () => {
      setIsError(true)
      setErrorText("Incorrect username or password")
    },
    onSettled: () => {
      setSignInLoading(false)
    },
  })

  const onLogin = (e: any) => {
    e.preventDefault();

    loginMutation.mutate({email: email, password: password, client_id: process.env.NEXT_PUBLIC_REACT_APP_OAUTH_CLIENT_ID ?? ''})
  }

  return (
    <>
      <div className="mt-8 mx-auto w-full max-w-md">
      { isError &&
          <ErrorAlert
          errorMessage={errorText}
          />}
        <div className="py-2"/>
        <div className="bg-gray-100 py-8 px-4 shadow-gray-500/50 shadow-sm rounded-lg sm:px-10">
          <form method="POST" onSubmit={onLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border pl-10 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password   
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  name="password"
                  type={ showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border pl-10 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
                <div className="pointer-events-auto hover:cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                  {!showPassword && <EyeIcon 
                    className="h-5 w-5 text-gray-400 hover:text-gray-500" aria-label="toggle password visibility" 
                    onClick={toggleShowPassword}
                  />}
                  {showPassword && <EyeSlashIcon 
                    className="h-5 w-5 text-gray-400 hover:text-gray-500" aria-label="toggle password visibility" 
                    onClick={toggleShowPassword}
                  />}
                </div>
              </div>
              <div className="mt-8">
                <GenericButtonStyle
                buttonType='submit'
                bgColor='bg-amber-700'
                hoverColor='hover:bg-amber-800'
                textColor='text-white'
                loading={signInLoading}
                text="Sign in"/>
              </div>
            </div>
          </form>
          <div className="text-sm mt-4" >
            <a href="#" className="font-medium text-amber-700 hover:text-amber-800">
              Forgot your password?
            </a>
          </div>
          <div className="text-sm mt-2">
            <span className="text-gray-600">
              {"Don't have an account yet? "}
              </span>
            <a href="#" className="font-medium text-amber-700 hover:text-amber-800">
              Sign up!
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
