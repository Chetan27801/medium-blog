import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@chejos/medium-common";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

//middlewares
blogRouter.use("/*", async (c, next) => {
	const authHeader = c.req.header("authorization") || "";
	const token = authHeader.split(" ")[1];

	const response = await verify(token, c.env.JWT_SECRET);

	if (!response) {
		c.status(403);
		return c.json({ error: "unauthorized" });
	}
	console.log(typeof response);
	if (typeof response.id === "string") c.set("userId", response.id);
	await next();
});

blogRouter.post("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs not correct",
		});
	}
	const authorId = c.get("userId");
	const blog = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: authorId,
		},
	});
	return c.json({
		id: blog.id,
	});
});

blogRouter.put("/", async (c) => {
	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs not correct",
		});
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	// console.log(body);
	try {
		await prisma.post.update({
			where: {
				id: body.id,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});

		return c.json({
			id: body.id,
		});
	} catch (error) {
		console.log(error);
		return c.json({
			message: "Unable to update try again",
		});
	}
});
blogRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	//Todo: we can add pagination to return 10 blogs

	try {
		const blogs = await prisma.post.findMany({
			select: {
				content: true,
				title: true,
				id: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});
		return c.json({
			blogs,
		});
	} catch (error) {
		c.status(411);
		return c.json({
			message: "Error while fetching posts",
		});
	}
});

blogRouter.get("/:id", async (c) => {
	const id = await c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blog = await prisma.post.findFirst({
			where: {
				id: id,
			},
			select: {
				title: true,
				content: true,
				id: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		return c.json({
			blog,
		});
	} catch (error) {
		c.status(411);
		return c.json({
			message: "Error while fetching blog post",
		});
	}
});
