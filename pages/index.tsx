import type {NextPage, NextPageContext} from 'next'
import {apiCall} from "../services/api-call";
import {getSession, signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {GoogleLoginButton} from "react-social-login-buttons";

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
const DynamicWeightSelector = dynamic(() => import ('../components/weight-selector'), {ssr: false});

const Home: NextPage = () => {
    const {data: session} = useSession();

    const router = useRouter();
    const graphqlURL = router.basePath + "/api/workout_graphql";
    return (<>
        <div className="absolute top-0 right-20">
            {!session && <GoogleLoginButton
                // @ts-ignore
                size={"36px"}
                onClick={signIn}/>}
            {session && <button
            className="bg-red-300 rounded-lg p-1" onClick={() => signOut()}>Sign out</button>}
        </div>
        <div className="absolute border-2 p-1 top-10 right-0 w-64 break-words h-auto border-slate-600">
            {JSON.stringify(session, null, 4)}
        </div>
        <div className="antialiased font-medium flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-4">Basic Workout Routine Tracker</h1>
            <hr/>
            <h2 className="text-xl">Current Day</h2>
            <DynamicWeightSelector weight={10} exercise={"Barbell Rows"}/>
            {/*<label>Bench Press</label>*/}
            {/*<label>Squats</label>*/}
            <button
                onClick={() => apiCall(graphqlURL, operationsDoc, "InitialQuery").then(result => console.log(result))}>
                Click me!
            </button>
        </div>
    </>);
}
export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            session: await getSession(context),
        },
    }
}

export default Home
