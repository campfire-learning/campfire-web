import { ChannelContext } from "./ChannelContext"
import { ClubContext } from "./ClubContext"
import { CourseContext } from "./CourseContext"
import { InterestContext } from "./InterestContext"

export const AppContext = ({ children } : {children: React.ReactNode}) => {

  return (
    <CourseContext>
      <ClubContext>
        <InterestContext>
          <ChannelContext>
            {children}
          </ChannelContext>
        </InterestContext>
      </ClubContext>
    </CourseContext>
  )
}