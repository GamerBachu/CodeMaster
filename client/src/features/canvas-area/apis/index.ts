import { generateGuidV2, getDateString, type IUniverseData } from "../interfaces";

/**
 * Fetches universe area data from the server.
 * @param id The ID of the universe area to fetch.
 * @returns A promise that resolves to the universe area data.
 */
const getData = async (id: string): Promise<IUniverseData[]> => {
    // TODO: Replace with actual API endpoint
    //   const response = await fetch(`/api/universe-area/${id}`);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    if (id === "") {
        return Promise.reject(new Error("Invalid ID"));
    }

    const universe: IUniverseData[] = [
        {
            id: generateGuidV2(),
            name: "Room-1",
            updatedAt: getDateString(),
            updatedBy: "user-1",

            shapes: []
        },
        {
            id: generateGuidV2(),
            name: "Room-2",
            updatedAt: getDateString(),
            updatedBy: "user-1",

            shapes: []
        },

    ];


    return Promise.resolve(universe);
};


const apiServices = { getData };
export default apiServices;