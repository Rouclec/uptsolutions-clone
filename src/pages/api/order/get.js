import { getAll } from "../../../lib/helper";
import Order from "../../../models/Order";

const getOrders = getAll(Order)
export default getOrders;