import {useClipboard} from "@vueuse/core";

const {copy} = useClipboard({
    legacy: true
})
const copyToClipBoard = async (value: string) => {
    await copy(value)
};

export default copyToClipBoard;
