import { SelectedGroupLevel } from "components/context/SidebarContext"
import { useContext } from "react"

export const GroupLevelTitle = () => {
  const { selectedGroupLevel } = useContext(SelectedGroupLevel)

  type map = { [key: string]: string };

  const titleRemap = {
    'Courses': 'Find New Courses',
    'Clubs' : 'Find New Clubs',
    'Interests' : 'Find New Interests'
  } as map

  const title = titleRemap[selectedGroupLevel.name as string] ?? selectedGroupLevel.name
  
  return (
    <>
      <h2 className="flex text-2xl font-light text-gray-200 sm:truncate sm:text-xl px-3 sm:px-6 md:px-6 md:pt-5 ">
        <>
            {selectedGroupLevel.icon && 
            <selectedGroupLevel.icon
            className='text-gray-200 mr-[0.25rem] flex-shrink-0 h-[1.65rem] w-[1.65rem]'
            aria-hidden="true"
            />}
            {`${title}`}
        </>
      </h2>
    </>
  )
}