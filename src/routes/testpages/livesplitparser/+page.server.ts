import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";


const options = {
        ignoreAttributes: false,
        // alwaysCreateTextNode: true
    };
const parser = new XMLParser(options);

let parsedJson;

export async function load({}) {
fetch('https://pastebin.com/raw/my3YZnZg')
        .then(response => response.text())
        .then(xmlString => parser.parse(xmlString))
        .then(data => parsedJson = data)
        .then(data => console.log(parsedJson.Run.Segments.Segment[5].SegmentHistory.Time[5]["@_id"]))

return parsedJson;
}