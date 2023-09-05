import { updateOne } from "../../../lib/helper";
import Order from "../../../models/Order";

const updateOrder = updateOne(Order, ['documents', 'amount', 'paymentMethod', 'deliveryAddress', 'email', 'phoneNumber']);
export default updateOrder;