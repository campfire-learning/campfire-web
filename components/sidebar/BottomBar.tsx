'use client' 

import { startCase } from 'lodash';

export const BottomBar = () => {
  const localStorageExists = (typeof window !== 'undefined')

  const firstName = localStorageExists && JSON.parse(localStorage.getItem('user') || 'null')?.first_name
  const lastName = localStorageExists && JSON.parse(localStorage.getItem('user') || 'null')?.last_name
  const role = localStorageExists && startCase(JSON.parse(localStorage.getItem('user') || 'null')?.user_type)

  return (
    <div className="flex flex-shrink-0 bg-zinc-800 border-t border-zinc-700 p-4">
      <div className="group block w-full flex-shrink-0">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{firstName} {lastName}</p>
            <p className="text-xs font-medium text-gray-300">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

