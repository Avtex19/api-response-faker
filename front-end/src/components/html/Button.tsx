import type {ButtonHTMLAttributes, ReactNode} from "react";
import classNames from "classnames";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({children, onClick, className, ...rest}: ButtonProps) => {
    return <button
        {...rest}
        onClick={onClick}
        className={classNames("bg-blue-100 text-black p-2 rounded-2xl hover:brightness-90 active:scale-90 hover:cursor-pointer", className)}>{children}</button>
}