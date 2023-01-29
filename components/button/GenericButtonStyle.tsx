import { LoadingIcon } from "components/assets/LoadingIcon"
import Link from "next/link"
import { MouseEventHandler } from "react"

export const GenericButtonStyle = ({
    buttonType,
    bgColor,
    hoverColor,
    textColor,
    width,
    loading,
    text,
    padding,
    href,
    onClick,
} : { 
    buttonType?: "button" | "reset" | "submit" | undefined,
    bgColor: string,
    hoverColor: string,
    textColor: string,
    width?: string,
    loading?: boolean,
    text: string,
    padding?: string,
    href?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}) => {
    const buttonStyle = (
        <div className={padding}>
            <button
                type={buttonType || "button"}
                className={`${bgColor} ${hoverColor} ${textColor}
                ${width ? width : "w-full"} inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm`}
                onClick={onClick}
            >
                {loading &&
                <LoadingIcon/>
                } 
                {text}
            </button>
        </div>
    )
    return (
        href ? <Link href={href}>
            {buttonStyle}
        </Link> :
        <>
            {buttonStyle}
        </>
    )
}