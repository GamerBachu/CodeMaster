import React, { useCallback, useEffect, useRef } from "react";
import { Canvas } from "fabric";
import { config } from "./Config";
import { scrollHorizontal, scrollVertical, scrollRefresh } from "./scroll";

type CanvasScrollProps = {
    area: {
        width: number;
        height: number;
    };
    canvas: Canvas | undefined;
};

const CanvasScroll = ({ area, canvas }: CanvasScrollProps) => {
    const verticalScrollBody = useRef<HTMLDivElement>(null);
    const verticalScroll = useRef<HTMLDivElement>(null);
    const horizontalScrollBody = useRef<HTMLDivElement>(null);
    const horizontalScroll = useRef<HTMLDivElement>(null);

    const onScrollVertical = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            if (!verticalScrollBody.current) return;
            if (canvas === undefined || canvas === null) return;
            canvas.discardActiveObject();
            const scrollY = e.currentTarget.scrollTop;
            scrollVertical(canvas, scrollY);
        },
        [canvas]
    );

    const onScrollHorizontal = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            if (!horizontalScrollBody.current) return;
            if (canvas === undefined || canvas === null) return;
            canvas.discardActiveObject();
            const scrollX = e.currentTarget.scrollLeft;
            scrollHorizontal(canvas, scrollX);
        },
        [canvas]
    );

    const handleWheel = useCallback(
        (e: WheelEvent) => {
            e.stopPropagation();
            if (canvas === undefined || canvas === null) return;
            if (
                verticalScrollBody.current === undefined ||
                verticalScrollBody.current === null
            )
                return;
            if (
                verticalScroll.current === undefined ||
                verticalScroll.current === null
            )
                return;
            if (
                horizontalScrollBody.current === undefined ||
                horizontalScrollBody.current === null
            )
                return;
            if (
                horizontalScroll.current === undefined ||
                horizontalScroll.current === null
            )
                return;

            const { deltaX, deltaY } = e;
            console.log({ deltaX, deltaY });

            if (Math.abs(deltaX) !== 0) {
                horizontalScrollBody.current.scrollLeft += deltaX;
            }
            if (Math.abs(deltaY) !== 0) {
                verticalScrollBody.current.scrollTop += deltaY;
            }
        },
        [canvas]
    );

    const calculateScrollOnZoom = useCallback((zoom: number) => {
        if (
            verticalScrollBody.current === undefined ||
            verticalScrollBody.current === null
        )
            return;
        if (verticalScroll.current === undefined || verticalScroll.current === null)
            return;
        if (
            horizontalScrollBody.current === undefined ||
            horizontalScrollBody.current === null
        )
            return;
        if (
            horizontalScroll.current === undefined ||
            horizontalScroll.current === null
        )
            return;

        const newWidth = horizontalScrollBody.current.clientWidth;
        const newHeight = verticalScrollBody.current.clientHeight;
        const { newScrollbarWidth, newScrollbarHeight } = scrollRefresh(
            newHeight,
            newWidth,
            zoom
        );

        horizontalScroll.current.style.width = newScrollbarWidth + "px";
        verticalScroll.current.style.height = newScrollbarHeight + "px";
    }, []);

    useEffect(() => {
        calculateScrollOnZoom(
            config.zoom.defaultZoom / config.zoom.zoomRatioMultiplier
        );
    }, [canvas, area, calculateScrollOnZoom]);

    useEffect(() => {
        if (!canvas) return;
        const wrapperEl = canvas?.wrapperEl;
        if (!wrapperEl) return;
        wrapperEl.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            wrapperEl.removeEventListener("wheel", handleWheel);
        };
    }, [canvas, handleWheel]);

    return (
        <>
            <div
                className="area-design-scrollbar vertical"
                style={{
                    height: area.height - config.scrollMargin.height,
                    display: "block",
                }}
                onScroll={onScrollVertical}
                ref={verticalScrollBody}
            >
                <div
                    ref={verticalScroll}
                    style={{ height: area.height - config.scrollMargin.height }}
                />
            </div>
            <div
                className="area-design-scrollbar horizontal"
                style={{
                    width: area.width - config.scrollMargin.width,
                    display: "block",
                }}
                onScroll={onScrollHorizontal}
                ref={horizontalScrollBody}
            >
                <div
                    ref={horizontalScroll}
                    style={{ width: area.width - config.scrollMargin.width }}
                />
            </div>
        </>
    );
};

export default CanvasScroll;
