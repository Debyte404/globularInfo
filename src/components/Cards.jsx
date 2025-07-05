
import './componentsCss/cards.css';

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-content">
                {props.image && (
                    <img src={props.image} alt={props.title} className="card-image" />
                )}
                <h2 className="card-title">{props.title}</h2>
                <div className="card-divider"></div>
                <p className="card-description">{props.description}</p>
                {/* <a href={props.link} className="card-link">Learn More</a> */}
            </div>
        </div>
    );
}