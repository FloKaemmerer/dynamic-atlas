import type {StageState} from "@/model/stageState";
import {handleWheelZoom} from "@/composable/zoomHandlers/wheel-zoom";
import {handleMobileStageZoom} from "@/composable/zoomHandlers/pinch-zoom";

export const handleZoom = (state: StageState) => {
    if (state.stage) {
        const stage = state.stage
        stage.on('wheel', function (e) {
            handleWheelZoom(e, state);
        });
        stage.on('touchmove', function (e) {
            handleMobileStageZoom(e, state);
        });

        stage.on('touchend', function () {
            state.lastDist = 0;
            state.lastCenter = undefined;
        });
    }
}