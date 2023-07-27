import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";

const parser = new XMLParser();
let parsedJson;

export async function load({}) {
fetch('https://pastebin.com/raw/my3YZnZg')
        .then(response => response.text())
        .then(xmlString => parser.parse(xmlString))
        .then(data => parsedJson = data)
        .then(data => console.log(parsedJson))

return parsedJson;
}