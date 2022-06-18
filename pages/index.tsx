import type { NextPage } from 'next'
import WeightSelector from "../components/weight-selector";
import {apiCall} from "../services/api-call";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

const operationsDoc = `
  query InitialQuery {
    workout_weight_snapshot {
      exercise
      id
      recorded_at
      user_id
      weight
    }
  }
`;

// disable SSR for this component so we can use localstorage
const DynamicWeightSelector = dynamic(() => import ('../components/weight-selector'), { ssr: false});

const Home: NextPage = () => {
  const router = useRouter();
  const graphqlURL = router.basePath + "/api/workout_graphql";
  return (<div className="antialiased font-medium flex flex-col justify-center items-center">
    <h1 className="text-2xl mb-4">Basic Workout Routine Tracker</h1>
    <hr/>
    <h2 className="text-xl">Current Day</h2>
<DynamicWeightSelector weight={10} exercise={"Barbell Rows"}/>
    {/*<label>Bench Press</label>*/}
    {/*<label>Squats</label>*/}
  <button onClick={() => apiCall(graphqlURL, operationsDoc, "InitialQuery").then(result => console.log(result))}>
      Click me!
  </button>
    </div>);
}

export default Home
