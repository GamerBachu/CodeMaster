
const findTotalAreaToShow = (clientWidth: number,
    totalTabs: number): number => {

    const TAB_WIDTH = 145;
    const ADD_BUTTON_WIDTH = 35;
    const DROPDOWN_BUTTON_WIDTH = 35;

    const requiredWidthWithAdd = totalTabs * TAB_WIDTH + ADD_BUTTON_WIDTH;

    if (requiredWidthWithAdd <= clientWidth) {
        return totalTabs;
    }

    const availableWidth = clientWidth - ADD_BUTTON_WIDTH - DROPDOWN_BUTTON_WIDTH;

    if (availableWidth < TAB_WIDTH) {
        return 0;
    }

    return Math.floor(availableWidth / TAB_WIDTH);
};

export default findTotalAreaToShow;