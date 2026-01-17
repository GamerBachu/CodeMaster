export const truncateText = (e: string): string => {
    if (e.length < 10) return e;
    else return e.substring(0, 8) + "...";
};