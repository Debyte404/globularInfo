import "./componentsCss/cards.css";
import ReadAloud from "./speak";

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
        <ReadAloud paragraph={props.description} />
        
        {props.link && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${props.link}`}
            className="card-link"
            target="_blank"
          >
            <span className="material-symbols-outlined card-icon">directions</span>
          </a>
        )}
        {/* <a href={props.link} className="card-link">Learn More</a> */}
      </div>
    </div>
  );
}
