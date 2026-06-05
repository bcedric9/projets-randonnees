import '/style/global.css';
import header from '../assets/header.jpg'

function Header() {
  return (

    <div className="Page">
      <div className='title'>
        <img src={header} alt="Mountain Adventure" className="header" />
        <h1 className="mountain-title">
          MOUNTAIN ADVENTURE
        </h1>
      </div>
    </div>
  );
}

export default Header;