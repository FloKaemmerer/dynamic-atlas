import {useClipboard, usePermission} from "@vueuse/core";

const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')
const {text, copy, copied, isSupported} = useClipboard()
const copyToClipBoard = async (value: string) => {
    await copy(value)
    // ElMessage({
    //     dangerouslyUseHTMLString: true,
    //     type: "success",
    //     message: "<strong>Link wurde kopiert: <br> " + value + "</strong>",
    // });
};

export default copyToClipBoard;
