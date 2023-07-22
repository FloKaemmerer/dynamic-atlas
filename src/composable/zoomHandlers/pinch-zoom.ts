import type {StageState} from "@/model/stageState";

export function handleMobileStageZoom(e:any, state:StageState) {
    e.evt.preventDefault();
    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    if (touch1 && touch2 && state.stage) {
        // if the stage was under Konva's drag&drop
        // we need to stop it, and implement our own pan logic with two pointers
        if (state.stage.isDragging()) {
            state.stage.stopDrag();
        }

        const p1 = {
            x: touch1.clientX,
            y: touch1.clientY,
        };
        const p2 = {
            x: touch2.clientX,
            y: touch2.clientY,
        };

        if (!state.lastCenter) {
            state.lastCenter = getCenter(p1, p2);
            return;
        }
        const newCenter = getCenter(p1, p2);

        const dist = getDistance(p1, p2);

        if (!state.lastDist) {
            state.lastDist = dist;
        }

        // local coordinates of center point
        const pointTo = {
            x: (newCenter.x - state.stage.x()) / state.stage.scaleX(),
            y: (newCenter.y - state.stage.y()) / state.stage.scaleX(),
        };

        const scale = state.stage.scaleX() * (dist / state.lastDist);

        state.stage.scaleX(scale);
        state.stage.scaleY(scale);

        // calculate new position of the stage
        const dx = newCenter.x - state.lastCenter.x;
        const dy = newCenter.y - state.lastCenter.y;

        const newPos = {
            x: newCenter.x - pointTo.x * scale + dx,
            y: newCenter.y - pointTo.y * scale + dy,
        };

        state.stage.position(newPos);

        state.lastDist = dist;
        state.lastCenter = newCenter;
    }
}

function getDistance(p1: any, p2:any) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: any, p2:any) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
    };
}