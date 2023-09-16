import { ChannelContextContainer } from "./ChannelContext";
import { ClubContextContainer } from "./ClubContext";
import { CourseContextContainer } from "./CourseContext";
import { InterestContextContainer } from "./InterestContext";

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <CourseContextContainer>
      <ClubContextContainer>
        <InterestContextContainer>
          <ChannelContextContainer>{children}</ChannelContextContainer>
        </InterestContextContainer>
      </ClubContextContainer>
    </CourseContextContainer>
  );
};
