import { PrismaClient } from "@prisma/client";
import { Shops, Users } from "./seed.data";

const prisma = new PrismaClient();



async function main() {

    if(!(await prisma.shop.findFirst())) {
        return;
    }

    await prisma.user.createMany({
        data: Users
    }).then(() => Promise.all(
        Shops.map(async (shop) => {
            const goods = shop.goods;
            delete shop.goods;

            await prisma.shop.create({
                data: {
                    ...shop,
                    goods: {
                        createMany: {
                            data: goods
                        }
                    }
                },
                include: {
                    goods: true
                },
            });
        })
    ).then(() => {
        let promises = [
            prisma.user.findMany({ where: { hasDeleted: false }, select: { id: true } }),
            prisma.shop.findMany({ where: { hasDeleted: false }, select: { id: true } }),
        ];

        return Promise.all(promises);
    }).then((args) => {
        const users = args[0];
        const shops = args[1];
        const data = [];
        users.forEach(user => shops.forEach(shop => {
            data.push({ userId: user.id, shopId: shop.id });
        }))

        return prisma.userOnShop.createMany({
            data
        });
    }));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    })