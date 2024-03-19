class Order {
    constructor(id, customerName, customerId, email, phoneNumber, time, status = 'pending', totalPrice = 0) {
        this.id = id;
        this.customerName = customerName;
        this.customerId = customerId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.time = time;
        this.status = status;
        this.totalPrice = totalPrice;
    }
}

export default Order;
