import { updateOne } from "../../../../lib/helper";
import Document from "../../../../models/Document";

const updateDoc = updateOne(Document, ['name', 'pages', 'paperType', 'paperSize', 'orientation', 'printSides', 'color', 'pagesPerSheet', 'printingType', 'bindingType', 'description', 'file', 'status']);
export default updateDoc;