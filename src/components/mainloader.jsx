import './componentsCss/mainloader.css';

export default function MainLoader() {
    return (
        <div className="main-loader">
            <img className="main-img" src="./assets/loading.gif" alt="Loading" />
            <p style={{color:'white', fontSize:'18px'}}>The backend is on a free hosting so please enjoy the spinning cat while it loads</p>
            {/* <p>Scroll down for more</p> */}
        </div>
    )
}