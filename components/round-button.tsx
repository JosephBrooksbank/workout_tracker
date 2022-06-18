import {FC, ReactNode} from "react";

interface IProps {
    /* color as tailwind-bg-color */
    color: string;
    children: ReactNode
    onClick?: () => void;
}

const RoundButton: FC<IProps> = (props) => {

    const className = `m-1 flex justify-center items-center flex-col h-10 w-10 rounded-full text-black hover:bg-slate-600 font-medium hover:text-white ${props.color}`

    return (
        <div onClick={props.onClick}
            className={className}>
            {props.children}
        </div>);
}

export default RoundButton;