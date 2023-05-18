const getOverlayColor = (value: number) => {
    switch (value) {
        case 0: {
            return '#c20301';
        }
        case 1: {
            return '#eb4823';
        }
        case 2: {
            return '#fd7842';
        }
        case 3: {
            return '#f6a676';
        }
        case 4: {
            return '#f6bf99';
        }
        case 5: {
            return '#fdc32c';
        }
        case 6: {
            return '#ffcf3d';
        }
        case 7: {
            return '#ebdeb2';
        }
        case 8: {
            return '#c4d7ee';
        }
        case 9: {
            return '#a5ccab';
        }
        case 10: {
            return '#59873a';
        }
        default: {
            return '#ff0904';
        }
    }
}

export default getOverlayColor