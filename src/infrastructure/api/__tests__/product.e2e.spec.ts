import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a product", async () => {
		const response = await request(app)
			.post("/product")
			.send({ type: "a", name: "Perfume Arabe", price: 400 });

		expect(response.status).toEqual(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.name).toEqual("Perfume Arabe");
		expect(response.body.price).toEqual(400);
	});

	it("should not create a product when name is not provided", async () => {
		const response = await request(app)
			.post("/product")
			.send({ type: "a", name: "", price: 100 });

		expect(response.status).toEqual(400);
	});

	it("should list all products", async () => {
		await request(app).post("/product").send({ type: "a", name: "Perfume Arabe", price: 400 });
		await request(app).post("/product").send({ type: "a", name: "Nike dunk", price: 800 });

		const response = await request(app).get("/product").send();
		const product1 = response.body.products[0];
		const product2 = response.body.products[1];

		expect(response.status).toEqual(200);
		expect(response.body.products.length).toEqual(2);

		expect(product1.name).toEqual("Perfume Arabe");
		expect(product2.name).toEqual("Nike dunk");
	});
});