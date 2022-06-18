import {useRouter} from "next/router";

export async function apiCall(url: string, queryString: string, operationName: string, variables?: { [x: string]: string }) {
    const result = await fetch(
        url,
        {
            method: "POST",
            // TODO AUTH
            body: JSON.stringify({
                query: queryString,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}
