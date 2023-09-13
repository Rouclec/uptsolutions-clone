import { createOne } from "lib/helper";
import Order from "models/Order";

const createOrder = createOne(Order, ['documents', 'amount', 'user']);
export default createOrder;