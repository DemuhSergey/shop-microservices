import { Currency, Role } from "@prisma/client";

const Users = [{
    firstName: "Test",
    lastName: "Test",
    role: Role.Main
}, {
    firstName: "Test2",
    lastName: "Test2",
    role: Role.DeliveryManager
}, {
    firstName: "Test3",
    lastName: "Test3",
    role: Role.SuperVisor
}, {
    firstName: "Test3",
    lastName: "Test3",
    role: Role.SalesMan
}];

const Shops = [{
    title: "Addidas",
    description: "Germany sport equipment",
    goods: [{
        title: "Edwards",
        description: "edwards 1",
        price: 170,
        discount: "20",
        currency: Currency.EUR
    }]
},
{
    title: "Nike",
    description: "American sport equipment",
    goods: [{
        title: "airmax",
        description: "running shoes",
        price: 100,
        discount: "0",
        currency: Currency.USD
    }, {
        title: "jordan",
        description: "luka 1",
        price: 110,
        discount: "0",
        currency: Currency.USD
    }, {
        title: "lebron",
        description: "lebron 14",
        price: 170,
        discount: "20",
        currency: Currency.USD
    }]
},
{
    title: "Under Armour",
    description: "American sport equipment",
    goods: [{
        title: "curry",
        description: "curry 1",
        price: 170,
        discount: "20",
        currency: Currency.EUR
    },
    {
        title: "curry",
        description: "curry 2",
        price: 90,
        discount: "10",
        currency: Currency.RUB
    }]
}
];

export { users, shops }