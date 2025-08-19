import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe("Customer Factory unit tests", () => {
	const address = {
		street: "Wilkie Way",
		number: 4290,
		zip: "94306",
		city: "Palo Alto, CA"
	};

	it("should create a customer with an address", () => {
		const customer = CustomerFactory.createWithAddress("John Doe", new Address(address.street, address.number, address.zip, address.city));

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");

		expect(customer.getAddress()?.street).toBe(address.street);
		expect(customer.getAddress()?.number).toBe(address.number);
		expect(customer.getAddress()?.zip).toBe(address.zip);
		expect(customer.getAddress()?.city).toBe(address.city);
	});

	it("should create a customer without address", () => {
		const customer = CustomerFactory.create("John Doe");

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.getAddress()).toBeFalsy();
	});

});
