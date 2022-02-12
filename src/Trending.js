import { useContext } from "react";
import Cards from "./Cards";
import { ProfileContext } from "./Contexts/Context";
import './style/Trending.css';

const Trending = () => {

    const {blogs} = useContext(ProfileContext);

    return ( 
        <div className="trending">
            <h1>Trending blogs of this week</h1>
            <div className="trending__blogs">
            {blogs.map((blog) => (
                <Cards author={blog.authorName} likes={blog.likes} comments={blog.comments} authorId = {blog.authorId} body={blog.body} title={blog.title} id={blog._id} />
            ))}
            </div>
        </div>
     );
}
 
export default Trending;