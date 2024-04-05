import { Link, useNavigate} from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <article style={{ padding: "100px" }}>
            <h2>Unauthorized!</h2>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
            </article>
            
        </section>
    )
    
}

export default Unauthorized