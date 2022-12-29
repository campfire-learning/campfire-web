'use client'

import { PageTitle } from "components/title/PageTitle"

export const TabBar = (
  {
    tabs,
  }: {
    tabs: Array<any>
}) => {

  return (
  <>
    <PageTitle titleArgs={{
      titles: ['']
    }}/>

   {/* Mobile */}
    <div className="sm:hidden px-3 pt-2">
      <label htmlFor="tabs" className="sr-only">
        Select a tab
      </label>
      <select
        id="tabs"
        name="tabs"
        className="block w-full rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        defaultValue={tabs.find((tab) => tab.current)?.name}
      >
        {tabs.map((tab) => (
          <option key={tab.name}>{tab.name}</option>
        ))}
      </select>
    </div>

    {/* Desktop */}
    <div className="hidden sm:block sm:px-6 md:px-5 md:py-1">
      <div className="border-b border-zinc-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={
                `${tab.current
                ? 'border-white text-white border-b-2'
                : 'border-zinc-700 text-gray-300 hover:text-gray-100 hover:border-gray-100'} 
                group inline-flex items-center py-4 px-1 font-medium text-sm`
              }
              aria-current={tab.current ? 'page' : undefined}
            >
              <tab.icon
                className={
                  `${tab.current
                  ? 'text-gray-100' : 'text-gray-400 group-hover:text-gray-100'} 
                  '-ml-0.5 mr-2 h-5 w-5'`
                }
                aria-hidden="true"
              />
              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  </>
  )
}

