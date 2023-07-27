import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    allowBooleanAttributes: true
};
const parser = new XMLParser(options);
let parsedJson;


export const actions ={
    default: async({request, fetch}) =>{
        const formData = await request.formData()
        const formObjectData = Object.fromEntries(formData)
        const res = await fetch(`${formObjectData.splitUrl}`)
        const xmlString = await res.text();
        const parsedData = parser.parse(xmlString)
        console.log(parsedData)
        return parsedData;
    }
}