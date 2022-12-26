import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ItunesItem } from "../../types";


const itemsAdapter = createEntityAdapter({
    selectId: (item: ItunesItem) => item.trackId
});

const itemsSelector = itemsAdapter.getSelectors();

const api = createApi({
    reducerPath: "itunes-api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/" }),
    endpoints: (builder) => ({
        search: builder.query({
            query: ({ term, offset }: {
                term: string, offset: number
            }) => `search?term=${term}&limit=10&offset=${offset}`,
            transformResponse: (response: any) => {
                return itemsAdapter.addMany(
                    itemsAdapter.getInitialState(),
                    response.results
                )
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.offset !== previousArg?.offset
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs?.term}`
            },
            merge: (currentState, incomingState) => {
                itemsAdapter.addMany(
                    currentState, itemsSelector.selectAll(incomingState)
                )
            }
        }),

    })
})

export const {
    useSearchQuery,
} = api

export {
    itemsSelector,
    itemsAdapter
}

export default api;