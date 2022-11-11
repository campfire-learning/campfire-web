import { SelectedChannelLevel, SelectedGroupLevel } from "components/context/SidebarContext"
import { useContext } from "react"

export const ChannelLevelTitle = () => {
  const { selectedChannelLevel } = useContext(SelectedChannelLevel)
  const { selectedGroupLevel } = useContext(SelectedGroupLevel)
  
  return (
    <h2 className="text-2xl font-light text-gray-200 sm:truncate sm:text-xl px-3 sm:px-6 md:px-6 md:pt-5 ">
      {`${selectedGroupLevel.name} : ${selectedChannelLevel.name}`}
    </h2>
  )
}