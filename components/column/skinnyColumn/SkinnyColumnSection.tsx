import Link from "next/link"
import { SkinnyColumnContentType } from "./SkinnyColumnContent"

export const SkinnyColumnSection = ({
  content,
} : {
  content: SkinnyColumnContentType[]
}) => {

  return (
    <>
      {content.map((item) => (
        <>
          {item.href && <Link
            key={item.name}
            href={item.href}
            className='hover:bg-zinc-700 group w-full p-3 rounded-md flex flex-col items-center'
          >
            <item.icon
              className='text-gray-400 group-hover:text-gray-100 w-8'
              aria-hidden="true"
            />
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">{item.name}</span>
          </Link>}
          {console.log(`pre-modal ${item.name}`)}
          {item.modal && <item.modal/>}
        </>
      ))}
    </>
  )
 }