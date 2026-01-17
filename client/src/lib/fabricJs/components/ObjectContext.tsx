import type { Canvas, FabricObject, Group } from "fabric";
import { useEffect, useRef, useState, useCallback } from "react";
import logger from "../../../utils/logger";
import BtnCopy from "../../../components/button/BtnCopy";
import BtnPaste from "../../../components/button/BtnPaste";
import BtnDuplicate from "../../../components/button/BtnDuplicate";
import BtnRotate from "../../../components/button/BtnRotate";
import BtnSendBack from "../../../components/button/BtnSendBack";
import BtnBringFront from "../../../components/button/BtnBringFront";
import BtnDelete from "../../../components/button/DeleteButton";


/** Type alias for selected objects - can be single, multiple, or null */
type SelectedType = FabricObject | Group | (FabricObject | Group)[] | null;

/**
 * ObjectContext Component
 * Renders a floating context menu for canvas object operations
 * Supports: Copy, Paste, Duplicate, Rotate, Bring to Front, Send to Back, Delete
 */
const ObjectContext = ({ canvas }: { canvas: Canvas | undefined; }) => {
    // UI state
    const [isVisible, setIsVisible] = useState(false);
    const [menuPos, setMenuPos] = useState<{ left: number; top: number; }>({ left: 0, top: 0 });

    // References for clipboard and selection (avoid state timing issues)
    const selectedRef = useRef<SelectedType>(null);
    const copiedRef = useRef<SelectedType>(null);

    /**
     * Updates the context menu position based on the selected object's bounding rect
     * Positions menu 12px to the right of the object
     */
    const updateMenuPosition = useCallback((target: FabricObject | Group) => {
        const bound = target.getBoundingRect();
        logger.info("ObjectContext", "Updating menu position for selected object");
        setMenuPos({
            left: bound.left + bound.width + 12,
            top: bound.top
        });
    }, []);

    useEffect(() => {
        if (!canvas) return;

        /**
         * Handles selection events (created/updated/cleared)
         * Updates selectedRef and menu visibility
         */
        const handleSelection = () => {
            const activeObjects = canvas.getActiveObjects();
            if (activeObjects.length > 0) {
                selectedRef.current = activeObjects.length === 1 ? activeObjects[0] : activeObjects;
                updateMenuPosition(activeObjects[0]);
                setIsVisible(true);
                logger.info("ObjectContext", `Selection updated: ${activeObjects.length} object(s) selected`);
            } else {
                selectedRef.current = null;
                setIsVisible(false);
                logger.info("ObjectContext", "Selection cleared");
            }
        };

        /**
         * Handles object movement and scaling
         * Updates menu position to follow the object
         */
        const handleMoving = (e: { target: FabricObject | Group; }) => {
            if (e.target && isVisible) updateMenuPosition(e.target);
        };

        // Register canvas event listeners
        canvas.on("selection:created", handleSelection);
        canvas.on("selection:updated", handleSelection);
        canvas.on("selection:cleared", handleSelection);
        canvas.on("object:moving", handleMoving);
        canvas.on("object:scaling", handleMoving);

        // Cleanup event listeners on unmount
        return () => {
            canvas.off("selection:created", handleSelection);
            canvas.off("selection:updated", handleSelection);
            canvas.off("selection:cleared", handleSelection);
            canvas.off("object:moving", handleMoving);
            canvas.off("object:scaling", handleMoving);
        };
    }, [canvas, updateMenuPosition, isVisible]);

    // --- LOGIC HELPERS ---

    /**
     * Offsets an object by the specified amount
     * Critical: calls setCoords() to recalculate bounding box after position change
     * @param obj - The fabric object to offset
     * @param offset - The offset amount in pixels (default: 20)
     */
    const offsetObject = (obj: FabricObject, offset: number = 20) => {
        obj.set({
            left: (obj.left || 0) + offset,
            top: (obj.top || 0) + offset
        });
        obj.setCoords(); // Critical for Fabric to recalculate bounding box
        logger.info("ObjectContext", `Object offset by ${offset}px`);
    };

    // --- ACTIONS ---

    /**
     * Copy action: clones all selected objects and stores in clipboard
     * Supports single and multiple selections
     */
    const handleCopy = async () => {
        if (!canvas) return;
        const active = canvas.getActiveObjects();
        if (active.length === 0) {
            logger.warn("ObjectContext", "Copy attempted with no objects selected");
            return;
        }

        copiedRef.current = await Promise.all(active.map(obj => obj.clone()));
        logger.info("ObjectContext", `Copied ${active.length} object(s) to clipboard`);
    };

    /**
     * Paste action: clones objects from clipboard with offset
     * Each paste adds 20px offset, allowing stacking multiple pastes
     */
    const handlePaste = async () => {
        if (!canvas || !copiedRef.current) {
            logger.warn("ObjectContext", "Paste attempted but clipboard is empty");
            return;
        }

        const items = Array.isArray(copiedRef.current) ? copiedRef.current : [copiedRef.current];
        logger.info("ObjectContext", `Pasting ${items.length} object(s) from clipboard`);

        canvas.discardActiveObject();
        const newPasted: FabricObject[] = [];

        // Get canvas center
        const canvasCenter = {
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2
        };

        for (const obj of items) {
            const clone = await obj.clone();
            // Center the object
            const bounds = clone.getBoundingRect();
            clone.set({
                left: canvasCenter.left - bounds.width / 2,
                top: canvasCenter.top - bounds.height / 2
            });
            clone.setCoords();
            canvas.add(clone);
            newPasted.push(clone);
        }

        // Keep the "clipboard" updated so the next paste moves even further
        copiedRef.current = newPasted;
        canvas.requestRenderAll();
    };

    /**
     * Duplicate action: clones all selected objects with offset and adds to canvas
     * Single operation - no intermediate clipboard step
     */
    const handleDuplicate = async () => {
        if (!canvas) return;
        const active = canvas.getActiveObjects();
        if (active.length === 0) {
            logger.warn("ObjectContext", "Duplicate attempted with no objects selected");
            return;
        }

        logger.info("ObjectContext", `Duplicating ${active.length} object(s)`);

        const clones = await Promise.all(active.map(obj => obj.clone()));

        canvas.discardActiveObject();
        clones.forEach(clone => {
            offsetObject(clone);
            canvas.add(clone);
        });

        canvas.requestRenderAll();
    };

    /**
     * Rotate action: rotates all selected objects by 15 degrees
     * Works on single objects, multiple objects, and groups
     */
    const handleRotate = () => {
        if (!canvas) return;
        const active = canvas.getActiveObjects();
        if (active.length === 0) {
            logger.warn("ObjectContext", "Rotate attempted with no objects selected");
            return;
        }

        logger.info("ObjectContext", `Rotating ${active.length} object(s) by 15 degrees`);
        active.forEach(obj => {
            obj.rotate(((obj.angle || 0) + 15) % 360);
        });
        canvas.requestRenderAll();
    };

    /**
     * Bring to Front action: moves selected objects to the top of the z-stack
     * Maintains relative order when multiple objects are selected
     */
    const bringToFront = () => {
        if (!canvas) return;
        const active = canvas.getActiveObjects();
        if (active.length === 0) {
            logger.warn("ObjectContext", "Bring to Front attempted with no objects selected");
            return;
        }

        logger.info("ObjectContext", `Bringing ${active.length} object(s) to front`);
        active.forEach(obj => canvas.bringObjectToFront(obj));
        canvas.requestRenderAll();
    };

    /**
     * Send to Back action: moves selected objects to the bottom of the z-stack
     * Reverses array to maintain relative order when multiple objects are selected
     */
    const sendToBack = () => {
        if (!canvas) return;
        const active = canvas.getActiveObjects();
        if (active.length === 0) {
            logger.warn("ObjectContext", "Send to Back attempted with no objects selected");
            return;
        }

        logger.info("ObjectContext", `Sending ${active.length} object(s) to back`);
        // Reverse to maintain stack order when moving multiple items to bottom
        [...active].reverse().forEach(obj => canvas.sendObjectToBack(obj));
        canvas.requestRenderAll();
    };

    /**
     * Delete action: removes all selected objects from canvas
     * Discards active selection and refreshes canvas
     */
    const handleDelete = () => {
        if (!canvas) return;
        const active = canvas.getActiveObjects();
        if (active.length === 0) {
            logger.warn("ObjectContext", "Delete attempted with no objects selected");
            return;
        }

        logger.info("ObjectContext", `Deleting ${active.length} object(s)`);
        canvas.remove(...active);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    };

    // Hide menu if nothing is selected
    if (!isVisible) return null;

    return (
        <div className="object-context-menu" style={{ left: menuPos.left, top: menuPos.top }}>
            {/* Header */}
            <div className="object-context-header  ">Object Actions</div>

            <BtnCopy
                label="Copy"
                onClick={handleCopy}
                buttonId="ob-c-1"
                className="d-flex justify-content-start"
                classNameImg="mt-0 ps-1"
                classNameLabel="text-black ps-2"
            ></BtnCopy>

            <BtnPaste
                label="Paste"
                onClick={handlePaste}
                buttonId="ob-c-1"
                className="d-flex justify-content-start"
                classNameImg="mt-0 ps-1"
                classNameLabel="text-black ps-2"
            ></BtnPaste>

            <BtnDuplicate
                label="Duplicate"
                onClick={handleDuplicate}
                buttonId="ob-c-1"
                className="d-flex justify-content-start"
                classNameImg="mt-0 ps-1"
                classNameLabel="text-black ps-2"
            ></BtnDuplicate>

            <div className="object-context-divider" />

            <BtnRotate
                label="Rotate 15°"
                onClick={handleRotate}
                buttonId="ob-c-1"
                className="d-flex justify-content-start"
                classNameImg="mt-0 ps-1"
                classNameLabel="text-black ps-2"
            ></BtnRotate>

            <BtnBringFront
                label="Bring to Front"
                onClick={bringToFront}
                buttonId="ob-c-1"
                className="d-flex justify-content-start"
                classNameImg="mt-0 ps-1"
                classNameLabel="text-black ps-2"
            ></BtnBringFront>

            <BtnSendBack
                label="Send to Back"
                onClick={sendToBack}
                buttonId="ob-c-1"
                className="d-flex justify-content-start"
                classNameImg="mt-0 ps-1"
                classNameLabel="text-black ps-2"
            ></BtnSendBack>


            <div className="object-context-divider" />

            <BtnDelete
                label="Delete"
                onClick={handleDelete}
                buttonId="ob-c-1"
                className="d-flex justify-content-start"
                classNameImg="mt-0 ps-1"
                classNameLabel="ps-2"
            ></BtnDelete>

        </div>
    );
};
export default ObjectContext;