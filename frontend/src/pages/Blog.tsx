import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { FullBlog } from "./../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
	const { id } = useParams();
	const { loading, blog } = useBlog({
		id: id || "",
	});
	return (
		<div>
			<Appbar />
			{loading ? (
				<div className="flex justify-between max-w-screen-2xl w-full">
					<BlogSkeleton />
					<BlogSkeleton />
				</div>
			) : (
				<FullBlog blog={blog!} />
			)}
		</div>
	);
};
