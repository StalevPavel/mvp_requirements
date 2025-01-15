import React, { useState } from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import MainContent from "./components/MainContent/MainContent";
import AddProject from './components/AddProject/AddProject';
import Login from "./components/Login/Login";
import { login } from './components/server';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [headerText, setHeaderText] = useState('Система управления требованиями');
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (text, button) => {
    setHeaderText(text);
    setActiveButton(button);
  };

  const handleLogin = async (username, password) => {
    try {
      const result = await login(username, password);
      if (result.status === 200) {
        setIsAuthenticated(true);
        setActiveButton('addProject');
      } else {
        alert(result.statusText);
      }
    } catch (err) {
      alert(err.message);
    }
  }


  return (
    <div>
      <Header text={headerText} />
      <Menu isAuthenticated={isAuthenticated} onButtonClick={handleButtonClick} activeButton={activeButton} />
      {!isAuthenticated && <MainContent />}
      {!isAuthenticated && <Login onLogin={handleLogin} />}
      {activeButton === 'addProject' && <AddProject />}
    </div>
  );
};

export default App;
