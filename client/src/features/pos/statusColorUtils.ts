const statusColorMap: Record<number, string> = {
    6: "danger",
    24: "warning",
    25: "success",
};

/**
 * Gets a Bootstrap color class based on the status.
 * @param status The status number.
 * @param prefix The prefix for the class name (e.g., "table-", "bg-"). Defaults to "table-".
 * @returns The full Bootstrap class name or an empty string.
 */
const getColorByStatus = (status: number, prefix: string) => {
    const color = statusColorMap[status];
    return color ? `${prefix}${color}` : "";
};

export const getStatusColor = (status: number) => getColorByStatus(status, "table-");

export const getStatusColor2 = (status: number) => getColorByStatus(status, "bg-");