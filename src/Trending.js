import Cards from "./Cards";
import './style/Trending.css';

const Trending = () => {
    return ( 
        <div className="trending">
            <h1>Trending blogs of this week</h1>
            <div className="trending__blogs">
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>

            </div>
        </div>
     );
}
 
export default Trending;