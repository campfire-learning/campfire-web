'use client'

import { startCase } from 'lodash';
import { useEffect, useState } from 'react';

export const BottomBar = ({
  isMini,
}:{
  isMini?: boolean,
}) => {
  const localStorageExists = (typeof window !== 'undefined')
  
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<string | boolean>('');

  useEffect(() => {
    setFirstName(localStorageExists && JSON.parse(localStorage.getItem('user') || 'null')?.first_name);
    setLastName(localStorageExists && JSON.parse(localStorage.getItem('user') || 'null')?.last_name);
    setRole(localStorageExists && startCase(JSON.parse(localStorage.getItem('user') || 'null')?.user_type));
  }, [])
  

  return (
    <div className="flex flex-shrink-0 border-t border-zinc-700 px-4 pt-4 pb-2">
      <div className="group block w-full flex-shrink-0">
        {!isMini && <div className="flex items-center">
          <div>
            <img
              className="inline-block w-9 rounded-full"
              src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{firstName} {lastName}</p>
            <p className="text-xs font-medium text-gray-300">{role}</p>
          </div>
        </div>}

        {isMini && <div className="flex flex-col items-center">
            <img
              className="inline-block w-11 rounded-full"
              src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
              <p className="text-xs font-medium text-gray-200 mt-2">{firstName} {lastName}</p>
              <p className="text-xs font-medium text-gray-300">{role}</p>
          </div>
        }
      </div>
    </div>
  )
}

