import path from "path";
import DataUriParser from "datauri/parser.js";

const parser = new DataUriParser();

const getDataUri = (file)=>{

       if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid or missing file in getDataUri");
    }

    const extName = path.extname(file?.originalname).toString();
    return parser.format(extName, file.buffer);

}

export default getDataUri;