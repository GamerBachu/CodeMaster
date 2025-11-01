import { type IUniverseData } from "../../interfaces";

const addUniverseAreaAction = (
    universeData: IUniverseData[],
    area: IUniverseData
): boolean => {
    universeData.push(area);
    return true;
};
export default addUniverseAreaAction;
