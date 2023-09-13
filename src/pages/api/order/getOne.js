import { getOne } from "lib/helper";
import Order from "models/Order";

const getOneOrder = getOne(Order, ['documents', 'user']);
export default getOneOrder