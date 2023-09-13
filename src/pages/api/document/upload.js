import Document from 'models/Document';
import { createOne } from "lib/helper";

const upload = createOne(Document, ['name', 'pages', 'paperType', 'paperSize', 'orientation', 'printSides', 'printColor', 'pagesPerSheet', 'printingType', 'bindingType, description', 'file', 'createdBy', 'amount'])
export default upload