import type {StageState} from "@/model/stageState";

export const handleZoom = (state: StageState) => {
    if (state.stage) {
        const stage = state.stage
        const scaleBy = 1.2;
        state.stage.on('wheel', (e) => {
            // stop default scrolling
            e.evt.preventDefault();

            const oldScale = stage.scaleX();
            const pointer = stage.getPointerPosition();
            if (pointer != null) {
                const mousePointTo = {
                    x: (pointer.x - stage.x()) / oldScale,
                    y: (pointer.y - stage.y()) / oldScale,
                };
                // how to scale? Zoom in? Or zoom out?
                let direction = e.evt.deltaY > 0 ? -1 : 1;

                // when we zoom on trackpad, e.evt.ctrlKey is true
                // in that case lets revert direction
                if (e.evt.ctrlKey) {
                    direction = -direction;
                }

                let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
                if (newScale >= 1.75) {
                    newScale = 1.75
                } else if (newScale <= 0.5) {
                    newScale = 0.5
                }

                stage.scale({x: newScale, y: newScale});
                state.currentScale = newScale
                const newPos = {
                    x: pointer.x - mousePointTo.x * newScale,
                    y: pointer.y - mousePointTo.y * newScale,
                };
                stage.position(newPos);
            }
        });
    }
}