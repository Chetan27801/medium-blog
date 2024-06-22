import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
	const { loading, blogs } = useBlogs();

	return (
		<div>
			<Appbar />
			{loading ? (
				<div className="flex flex-col items-center">
					<BlogSkeleton />
					<BlogSkeleton />
					<BlogSkeleton />
					<BlogSkeleton />
				</div>
			) : (
				<div className="flex justify-center">
					<div className="max-w-xl">
						{blogs.map((blog) => (
							<BlogCard
								key={blog.id}
								id={blog.id}
								authorName={blog.author.name}
								title={blog.title}
								content={blog.content}
								publishedDate={"21 June 2024"}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
