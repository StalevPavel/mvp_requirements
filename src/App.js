import React, { useState } from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import MainContent from "./components/MainContent/MainContent";
import AddProject from './components/AddProject/AddProject';
import Login from "./components/Login/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [headerText, setHeaderText] = useState('Система управления требованиями');
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (text, button) => {
    setHeaderText(text);
    setActiveButton(button);
  };

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Неверное имя пользователя или пароль");
    }
  };

  return (
    <div>
      <Header text={headerText} />
      <Menu isAuthenticated={isAuthenticated} onButtonClick={handleButtonClick} activeButton={activeButton}/>
      {!isAuthenticated && <MainContent />}
      {!isAuthenticated && <Login onLogin={handleLogin} />}
      {activeButton === 'addProject' && <AddProject />}
    </div>
  );
};

export default App;
