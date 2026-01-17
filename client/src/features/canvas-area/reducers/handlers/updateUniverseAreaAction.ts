import { type IUniverseData } from "../../interfaces";


//action 1. rename

const updateUniverseAreaAction = (
    universeData: IUniverseData[],
    area: IUniverseData,
    action: number
): boolean => {

    switch (action) {
        case 1:
            return renameUniverseAreaAction(universeData, area);
        default:
            return false;
    }

};

export default updateUniverseAreaAction;


function renameUniverseAreaAction(universeData: IUniverseData[], area: IUniverseData): boolean {

    const index = universeData.findIndex((item) => item.id === area.id);
    if (index === -1) return false;
    universeData[index].name = area.name;
    universeData[index].updatedAt = area.updatedAt;
    universeData[index].updatedBy = area.updatedBy;
    return true;
}


