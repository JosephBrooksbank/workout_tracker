import RoundButton from "./round-button";
import {useState} from "react";

interface IProps {
    weight: number,
    exercise: string;
}

const WeightSelector = (props: IProps) => {

    const [currentWeight, setCurrentWeight] = useState(props.weight);

    const increaseWeight = () => {
        setCurrentWeight(currentWeight+2.5);
    }
    const decreaseWeight = () => {
        setCurrentWeight(currentWeight-2.5);
    }

    const submitWeight = () => {

    }

    return <div className="flex justify-center items-center">
        <RoundButton
            color={"bg-red-300"}
            onClick={decreaseWeight}>
            -2.5
        </RoundButton>
        <div className="rounded-md shadow">
            <span className={"w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 md:py-1 md:text-lg md:px-8"}>
                {props.exercise}
            </span>
        </div>
        <div className={"text-lg md:py-1 md:px-2 ml-2 py-3 flex items-center justify-center border border-transparent text-base rounded-md bg-blue-300 w-12"}>{currentWeight}</div>

        <RoundButton color={"bg-green-300"}
        onClick={increaseWeight}>
            +2.5
        </RoundButton>

        <RoundButton color={"bg-green-500"}>
            ✓
        </RoundButton>
    </div>
}

export default WeightSelector;