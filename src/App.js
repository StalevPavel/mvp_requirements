import React, { useState } from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import MainContent from "./components/MainContent/MainContent";
import Login from "./components/Login/Login";
import AddProject from './components/AddProject/AddProject';
import Projects from './components/Projects/Projects';
import Project from "./Project/Project";
import Requirement from './components/Requirement/Requirement';
import Requirements from './components/Requirements/Requirements';
import { login, project, deleteProject, submitProjects, editProjects, archiveProjects, requirement, editRequirements, requirementInfo, requirements } from './components/server';
import { AdminPanel } from "./components/AdminPanel/AdminPanel";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerText, setHeaderText] = useState('Система управления требованиями');
  const [activeButton, setActiveButton] = useState(null);
  const [projectsList, setProjectsList] = useState(null);
  const [projectInfo, setProjectInfo] = useState({});
  const [requirementsList, setRequirementsList] = useState(null);
  const [requirementInfo, setRequirementInfo] = useState({});

  const handleButtonClick = (text, button) => {
    setHeaderText(text);
    setActiveButton(button);

    // Если нажата кнопка "Требования", вызываем `handleRequirements`
    if (button === 'requirements') {
      handleRequirements();
    }
  };

  const handleAddRequirement = () => {
    setActiveButton('addRequirement');
  };

  const handleLogin = async (username, password) => {
    try {
      const result = await login(username, password);

      if (result.status === 200) {
        setIsAuthenticated(true);
        if (result.role == 'ROLE_ADMIN') {
          setIsAdmin(true);
        }
        setActiveButton('projects');
        handleProjects();
      } else {
        alert(result.message || result.statusText || 'Ошибка авторизации');
      }
    } catch (err) {
      alert(err.message || 'Неизвестная ошибка');
    }
  };

  const handleProjects = async () => {
    try {
      const result = await project();

      if (result.status === 200) {
        setProjectsList(result.data);
      } else {
        alert(result.message || result.statusText || 'Ошибка получения списка проектов');
      }
    } catch (err) {
      alert(err.message || 'Неизвестная ошибка');
    }
  };
  const handleRequirements = async () => {
    try {
      const result = await requirements(); // Вызов импортированной функции
      if (result.status === 200) {
        setRequirementsList(result.data); // Обновляем состояние
      } else {
        alert(result.message || result.statusText || 'Ошибка получения списка требований');
      }
    } catch (err) {
      alert(err.message || 'Неизвестная ошибка');
    }
  };



  return (
    <div>
      <Header text={headerText} />

      <Menu isAuthenticated={isAuthenticated} onButtonClick={handleButtonClick} activeButton={activeButton} />

      {!isAuthenticated && <MainContent />}

      {!isAuthenticated && <Login onLogin={handleLogin} />}

      {activeButton === 'projects' && projectsList != null && (
        <Projects projectList={projectsList}
          handleProjects={handleProjects}
          deleteProject={deleteProject}
          setProjectsList={setProjectsList}
          handleButtonClick={handleButtonClick}
          setProjectInfo={setProjectInfo} />)}

      {activeButton === 'addProjects' && <AddProject submitProject={submitProjects} handleButtonClick={handleButtonClick} />}

      {activeButton === 'project' && (
        <Project
          projectInfo={projectInfo}
          editProjects={editProjects}
          archiveProjects={archiveProjects}
          handleButtonClick={handleButtonClick}
          requirementAPI={requirement}
          setRequirementInfo={setRequirementInfo} />)}

      {activeButton === 'requirements' && requirementsList != null && (
        <Requirements
          requirementsList={requirementsList}
          handleRequirements={handleRequirements}
          handleButtonClick={handleButtonClick}
          setRequirementsList={setRequirementsList}
          setRequirementInfo={setRequirementInfo} // Передача функции для установки информации о требовании
        />
      )}

      {activeButton === 'requirement' && (
        <Requirement
          requirementInfo={requirementInfo}
          handleProjects={project}
          editRequirement={editRequirements}
          updateRequirement={requirementInfo}
          archiveRequirement={() => { }}
          handleButtonClick={handleButtonClick}
          setRequirementInfo={setRequirementInfo} />)}

      {isAdmin && <AdminPanel/>}    
      
    </div>
  );
};

export default App;
