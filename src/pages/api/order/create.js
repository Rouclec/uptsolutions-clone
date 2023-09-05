import { createOne } from "../../../lib/helper";
import Order from "../../../models/Order";

const createOrder = createOne(Order, ['documents', 'amount', 'paymentMethod', 'deliveryAddress', 'email', 'phoneNumber']);
export default createOrder;