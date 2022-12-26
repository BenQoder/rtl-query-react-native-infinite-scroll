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
            // This params here are the query params that will be passed to the update query function
            query: ({ term, offset }: {
                term: string, offset: number
            }) => `search?term=${term}&limit=10&offset=${offset}&entity=song`,
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
        removeFromSearch: builder.mutation({
            query: ({ id }) => ({
                url: "",
                method: "DELETE",
                body: id
            }),
            // This would work if we had the backend implementation but i think itunes
            // Is returning some errors
            // So I will just use the onQueryStated function to update the query data
            onQueryStarted({ id, ...searchParams }, { dispatch }) {
                // For update query data to work we need to pass the exact query param 
                // on the search screen 
                dispatch(api.util.updateQueryData("search", searchParams, (draft) => {
                    itemsAdapter.removeOne(draft, id)
                }))
            },
        })
    })
})

export const {
    useSearchQuery,
    useRemoveFromSearchMutation
} = api

export {
    itemsSelector,
    itemsAdapter
}

export default api;