import type { NextPage } from 'next'
import WeightSelector from "../components/weight-selector";

const Home: NextPage = () => {
  return (<body className="antialiased font-medium flex flex-col justify-center items-center">
    <h1 className="text-2xl mb-4">Basic Workout Routine Tracker</h1>
    <hr/>
    <h2 className="text-xl">Current Day</h2>
<WeightSelector weight={10} exercise={"Barbell Rows"}/>
    {/*<label>Bench Press</label>*/}
    {/*<label>Squats</label>*/}
    </body>);
}

export default Home
