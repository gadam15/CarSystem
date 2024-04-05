import { Link, useNavigate} from "react-router-dom"

//Komponent Podstrony wyświetlającej się w razie próby dostania się do strony bez odpowiednich uprawnień
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