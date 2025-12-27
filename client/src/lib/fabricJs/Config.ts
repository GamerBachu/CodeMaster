export const canvasConfig = {
    width: 100,
    height: 100,
    backgroundColor: "#ffc107",

};

export const extendProps = ["data"];

export const config = {
    scrollMargin: { width: 20, height: 20 },
    zoom: {
        minZoom: 10,
        maxZoom: 200,
        centerZoom: false,
        deltaZoom: 5,
        defaultZoom: 100,
        zoomRatioMultiplier: 100,
    },
    controls: {
        borderColor: 'red',
        cornerColor: 'green',
        cornerSize: 6
    },
    context:{
        copy: true,
        paste: true,
        delete: true,
        rotate: true,
        duplicate: true,
        moreOptions: true

    }
};
 