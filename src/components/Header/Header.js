import './Header.css';

const Header = ({ text }) => {
    return (
    <header className="header">
        <h1>{text}</h1>
    </header>
    );
};

export default Header;
