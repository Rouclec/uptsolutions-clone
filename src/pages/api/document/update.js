import Document from 'models/Document';
import { updateOne } from "lib/helper";

const update = updateOne(Document, ['name', 'pages', 'paperType', 'paperSize', 'orientation', 'printSides', 'printColor', 'pagesPerSheet', 'printingType', 'bindingType, description', 'file', 'amount'])
export default update;