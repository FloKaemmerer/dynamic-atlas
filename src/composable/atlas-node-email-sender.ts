import type {AtlasNode} from "@/model/atlasNode";
import type {DivinationCardImproveDto} from "@/model/dtos/divinationCardImproveDto";
import convertToAtlasNodeImproveDto from "@/composable/atlas-node-improve-dto-converter";
import emailjs from "@emailjs/browser";
import type {AtlasNodeImproveDto} from "@/model/dtos/atlasNodeImproveDto";

export const sendAtlasNodes = async (atlasNodes: AtlasNode[]) => {
    const atlasNodesToSend: AtlasNodeImproveDto[] = []
    atlasNodes.forEach(atlasNode => {
        const divinationCardImproveDtos: DivinationCardImproveDto[] = [];
        const divCardNames = getDivinationCardNames(atlasNode).split(",");
        divCardNames.forEach(cardName => {
            const trimmedName = cardName.trim();
            if (trimmedName.length > 0)
                divinationCardImproveDtos.push({
                    name: trimmedName
                })
        })

        const atlasNodeImproveDto = convertToAtlasNodeImproveDto(atlasNode, divinationCardImproveDtos, atlasNode.additionalTags);
        atlasNodesToSend.push(atlasNodeImproveDto)
    })

    const templatePrams: Record<string, string> = {
        atlasNode: JSON.stringify(atlasNodesToSend, null, '\t'),
        atlasNodeName: atlasNodesToSend.map(value => value.name).toString()
    }

    return emailjs.send(`${import.meta.env.VITE_EMAILJS_SERVICE_ID}`,
        `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
        templatePrams,
        `${import.meta.env.VITE_EMAILJS_PUBLIC_KEY}`)
        .then((result) => {
            return result
        }).catch((res) => {
            return res
        });
}

function getDivinationCardNames(atlasNode: AtlasNode): string {
    let divinationCardNames = ""
    let first = true
    atlasNode.divinationCards.forEach(value => {
        if (first) {
            divinationCardNames = divinationCardNames.concat(value.name)
            first = false;
        } else {
            divinationCardNames = divinationCardNames.concat(", " + value.name)
        }
    })
    return divinationCardNames
}

function getAdditionalTags(atlasNode: AtlasNode): string {
    let additionalTags = ""
    let first = true
    atlasNode.additionalTags.forEach(value => {
        if (first) {
            additionalTags = additionalTags.concat(value)
            first = false;
        } else {
            additionalTags = additionalTags.concat(", " + value)
        }
    })
    return additionalTags
}

export const sendAtlasNode = async (atlasNode: AtlasNode, additionalTags: string, divinationCardNames: string) => {
    if (atlasNode) {
        const tags: string[] = []
        if (additionalTags) {
            const tagsSplits = additionalTags.split(",");
            tagsSplits.forEach(tag => {
                const trimmed = tag.trim();
                if (trimmed.length > 0) {
                    tags.push(trimmed)
                }
            })
        }

        const divinationCardImproveDtos: DivinationCardImproveDto[] = [];
        if (divinationCardNames) {
            const divCardNames = divinationCardNames.split(",");
            divCardNames.forEach(cardName => {
                const trimmedName = cardName.trim();
                if (trimmedName.length > 0)
                    divinationCardImproveDtos.push({
                        name: trimmedName
                    })
            })
        }

        const atlasNodeImproveDto = convertToAtlasNodeImproveDto(atlasNode, divinationCardImproveDtos, tags);
        const templatePrams: Record<string, string> = {
            atlasNode: JSON.stringify(atlasNodeImproveDto, null, '\t'),
            atlasNodeName: atlasNodeImproveDto.name
        }

        return emailjs.send(`${import.meta.env.VITE_EMAILJS_SERVICE_ID}`,
            `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
            templatePrams,
            `${import.meta.env.VITE_EMAILJS_PUBLIC_KEY}`)
            .then((result) => {
                return result
            }).catch((res) => {
                return res
            });
    }
}
