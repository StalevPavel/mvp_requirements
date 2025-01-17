import React, { useEffect, useState } from "react";
import './Project.css';

const Project = ({
  projectInfo,
  editProjects,
  archiveProjects,
  handleButtonClick,
  requirementAPI,
  setRequirementInfo,
  deleteRequirement,
}) => {
  const [projectName, setProjectName] = useState(projectInfo.name);
  const [developer, setDeveloper] = useState(projectInfo.developer);
  const [description, setDescription] = useState(projectInfo.description);
  const [startDate, setStartDate] = useState(projectInfo.startDateTime);
  const [endDate, setEndDate] = useState(projectInfo.endDateTime);
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const result = await requirementAPI(projectInfo.id);
        setRequirements(result.data);
      } catch (error) {
        console.error("Ошибка при загрузке требований:", error);
      }
    };
    fetchRequirements();
  }, [projectInfo.id, requirementAPI]);

  if (!projectInfo || !projectInfo.id) {
    return <p>Информация о проекте не найдена.</p>;
  }

  const isFormValid = () => {
    return (
      projectName.trim() &&
      developer.trim() &&
      description.trim() &&
      startDate &&
      endDate &&
      new Date(startDate) <= new Date(endDate)
    );
  };

  const handleRequirementClick = (requirementId, name, createdBy, projectName, createdAt, updatedAt, status, description) => {
    const requirement = {
      requirementId,
      name,
      createdBy,
      projectName,
      createdAt,
      updatedAt,
      status,
      description,
    };

    console.log("requirement", requirement);
    setRequirementInfo(requirement);
    handleButtonClick("Информация о требовании", "requirement");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      name: projectName,
      developer,
      description,
      startDateTime: `${startDate}T00:00:00`,
      endDateTime: `${endDate}T23:59:59`,
    };
    editProjects(projectInfo.id, project, handleButtonClick);
  };

  const handleArchiveProject = () => {
    archiveProjects(projectInfo.id, handleButtonClick);
  };

  return (
    <div className="project-details">
      <h1>Изменение проекта</h1>
      <form className="project-edit-form">
        <div className="form-group">
          <label>Название проекта:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Разработчик:</label>
          <input
            type="text"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Описание проекта:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Дата начала:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата окончания:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          className="edit-project-button"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          Изменить проект
        </button>
      </form>

      <table className="project-table">
        <thead>
          <tr>
            <th>Название проекта</th>
            <th>Разработчик</th>
            <th>Описание</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{projectInfo.name}</td>
            <td>{projectInfo.developer}</td>
            <td>{projectInfo.description}</td>
            <td>{new Date(projectInfo.startDateTime).toLocaleDateString()}</td>
            <td>{new Date(projectInfo.endDateTime).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>

      <div className="requirements">
        <h2>Связанные требования:</h2>
        <table className="requirements-table">
          <thead>
            <tr>
              <th>Название требования</th>
              <th>Автор</th>
              <th>Проект</th>
              <th>Дата создания</th>
              <th>Дата последнего изменения</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((requirement) => (
              <tr key={requirement.requirementId}>
                <td>
                  <button
                    className="requirement-link"
                    onClick={() =>
                      handleRequirementClick(
                        requirement.requirementId,
                        requirement.name,
                        requirement.createdBy,
                        requirement.projectName,
                        requirement.createdAt.split("T")[0],
                        requirement.updatedAt ? requirement.updatedAt.split("T")[0] : "Не изменялось",
                        requirement.status,
                        requirement.description
                      )
                    }
                  >
                    {requirement.name}
                  </button>
                </td>
                <td>{requirement.createdBy || "Не указано"}</td>
                <td>{requirement.projectName || "Не указано"}</td>
                <td>{new Date(requirement.createdAt).toLocaleDateString() || "Не указано"}</td>
                <td>
                  {requirement.updatedAt
                    ? new Date(requirement.updatedAt).toLocaleDateString()
                    : "Не изменялось"}
                </td>
                <td>{requirement.status || "Не указано"}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteRequirement(requirement.requirementId)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="archive-project-button"
        onClick={handleArchiveProject}
      >
        Архивировать проект
      </button>
    </div>
  );
};

export default Project;