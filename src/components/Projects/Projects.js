import { useEffect } from 'react';
import './Projects.css';

const Projects = ({ projectList, handleProjects, deleteProject, setProjectsList, handleButtonClick, setProjectInfo}) => {
    useEffect(()=> {
        handleProjects()
    }, []);

    const handleProjectClick = (projectId, projectName, developer, description, startDate, endDate) => {
        const project = {
            id: projectId,
            name: projectName,
            developer,
            description,
            startDateTime: startDate,
            endDateTime: endDate,
        };
        console.log('project',project)
        setProjectInfo(project);
        handleButtonClick('Информация о проекте', 'project')
    };

    return (
        <div className="project-container">
            <button className="refresh-button" onClick={handleProjects}>
                Обновить проекты
            </button>

            <table className="project-table">
                <thead>
                    <tr>
                        <th>Название проекта</th>
                        <th>Разработчик</th>
                        <th>Описание</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {projectList.map((project) => (
                        <tr key={project.projectId}>
                            <td>
                                <button className="project-link" onClick={
                                    () => handleProjectClick(project.projectId, project.name, project.developer, project.description, project.startDatetime.split('T')[0], project.endDatetime.split('T')[0])}>
                                    {project.name}
                                </button>
                            </td>
                            <td>{project.developer}</td>
                            <td>{project.description}</td>
                            <td>{new Date(project.startDatetime).toLocaleDateString()}</td>
                            <td>{new Date(project.endDatetime).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteProject(project.projectId, setProjectsList)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="add-button" onClick={() => handleButtonClick('Добавить проект', 'addProjects')}>
                Добавить проект
            </button>
        </div>
    );
};

export default Projects;
