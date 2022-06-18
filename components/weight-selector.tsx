import RoundButton from "./round-button";
import {useEffect, useState} from "react";

interface IProps {
    weight: number,
    exercise: string;
}

interface WeightSnapshot {
    name: string;
    weight: number;
    date: Date;
    completed: boolean;
}

const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
}
const setLocalStorage = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
}

const getWeightsFromStorage = () => {
    const text = getFromLocalStorage("weights");
    return JSON.parse(getFromLocalStorage("weights") ?? '[]').sort((a: WeightSnapshot, b: WeightSnapshot) => b.date.getTime() - a.date.getTime());
}

const WeightSelector = (props: IProps) => {

    const [localWeights, setLocalWeights] = useState<WeightSnapshot[]>(getWeightsFromStorage());
    useEffect(() => {
        setLocalStorage("weights", JSON.stringify(localWeights))
    }, [localWeights]);

    const [currentWeight, setCurrentWeight] = useState(JSON.parse(getFromLocalStorage("currentWeight") ?? "null"));
    useEffect(() => {
        setLocalStorage("currentWeight", JSON.stringify(currentWeight));
    }, [currentWeight]);

    if (currentWeight === null) {
        setCurrentWeight({name: props.exercise, weight: props.weight});
    }


    const increaseWeight = () => {
        setCurrentWeight({...currentWeight, weight: currentWeight.weight + 2.5});
    }
    const decreaseWeight = () => {
        setCurrentWeight({...currentWeight, weight: currentWeight.weight - 2.5});
    }

    const submitWeight = () => {
        const storedWeights = getWeightsFromStorage();
        const newWeight = {
            name: props.exercise,
            weight: currentWeight,
            date: Date.now().toString()
        }
        setLocalStorage("weights", JSON.stringify([...storedWeights, newWeight]));
        setLocalWeights(([...storedWeights, newWeight]));

    }

    const clearStorage = () => {
        setLocalWeights([]);
        setCurrentWeight({});
        localStorage.clear();
    }

    return <>
        {/*{JSON.stringify(localWeights)}*/}
        {/*<hr/>*/}
        {/*{JSON.stringify(currentWeight)}*/}
        <div className="flex justify-center items-center">
            <RoundButton color={'bg-gray-100'} onClick={clearStorage}>
                Reset
            </RoundButton>
            <RoundButton
                color={"bg-red-300"}
                onClick={decreaseWeight}>
                -2.5
            </RoundButton>
            <div className="rounded-md shadow">
            <span
                className={"w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 md:py-1 md:text-lg md:px-8"}>
                {props.exercise}
            </span>
            </div>
            <div
                className={"text-lg md:py-1 md:px-2 ml-2 py-3 flex items-center justify-center border border-transparent text-base rounded-md bg-blue-300 w-12"}>{currentWeight && currentWeight.weight}</div>

            <RoundButton color={"bg-green-300"}
                         onClick={increaseWeight}>
                +2.5
            </RoundButton>

            <RoundButton color={"bg-green-500"} onClick={submitWeight}>
                ✓
            </RoundButton>
        </div>
    </>
}

export default WeightSelector;