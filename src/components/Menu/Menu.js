import './Menu.css';

const Menu = ({ isAuthenticated , onButtonClick, activeButton}) => {

    return (
        <nav className="menu">
            <button 
                className={`menu-button ${activeButton === 'main' ? 'active' : ''}`}
                onClick={() => onButtonClick('Главная', 'main')}
                disabled={!isAuthenticated}
            >
                Главная
            </button>
            <button
                className={`menu-button ${activeButton === 'projects' ? 'active' : ''}`}
                onClick={() => onButtonClick('Проекты', 'projects')}
                disabled={!isAuthenticated}
            >
                Проекты
            </button>
            <button
                className={`menu-button ${activeButton === 'requirements' ? 'active' : ''}`}
                onClick={() => onButtonClick('Требования', 'requirements')}        
                disabled={!isAuthenticated}
            >
                Требования
            </button>
            <button
                className={`menu-button ${activeButton === 'settings' ? 'active' : ''}`}
                onClick={() => onButtonClick('Настройки', 'settings')}
                disabled={!isAuthenticated}
            >
                Настройки
            </button>
        </nav>
    );
};

export default Menu;
