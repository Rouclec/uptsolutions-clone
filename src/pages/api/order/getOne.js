import { getOne } from "../../../lib/helper";
import Order from "../../../models/Order";

const getOneOrder = getOne(Order, ['documents']);
export default getOneOrder