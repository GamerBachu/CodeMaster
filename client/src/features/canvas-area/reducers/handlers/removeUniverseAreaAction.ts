import { type IUniverseData } from "../../interfaces";

const removeUniverseAreaAction = (
    universeData: IUniverseData[],
    area: IUniverseData
): boolean => {
    const index = universeData.findIndex((item) => item.id === area.id);
    if (index === -1) return false;
    universeData.splice(index, 1);
    return true;
};

export default removeUniverseAreaAction;
