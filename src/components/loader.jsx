import './componentsCss/loader.css';

export default function Loader() {
    return (
        <div className="parent-loader">
            <img className="loader-img" src="./assets/loading2.gif" alt="Loading" />
            {/* <p>Scroll down for more</p> */}
        </div>
    )
}