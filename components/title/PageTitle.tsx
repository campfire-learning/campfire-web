import { SelectedGroupLevel } from "components/context/PageContext"
import { SVGProps, useContext } from "react"

export interface TitleArgs {
  icon?: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element,
  titles: string[]
}

export const PageTitle = ({
  titleArgs
}: {
  titleArgs: TitleArgs
}) => {


  return (
    <>
      <h2 className="flex text-2xl font-light text-gray-200 sm:truncate sm:text-xl px-3 sm:px-6 md:px-6 md:pt-5 ">
        <>
            {titleArgs.icon && 
            <titleArgs.icon
            className='text-gray-200 mr-[0.25rem] flex-shrink-0 h-[1.65rem] w-[1.65rem]'
            aria-hidden="true"
            />}
            {titleArgs.titles.filter(Boolean).join(' : ')}
        </>
      </h2>
    </>
  )
}