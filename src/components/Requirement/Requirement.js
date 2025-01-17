import React, { useState, useEffect } from "react";
import "./Requirement.css";

const Requirement = ({
  requirementInfo,
  handleProjects,
  editRequirement,
  updateRequirement,
  archiveRequirement,
  handleButtonClick,
  setRequirementInfo,
}) => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState(requirementInfo.name || "");
  const [project, setProject] = useState(null);
  const [description, setDescription] = useState(requirementInfo.description || "");
  const [status, setStatus] = useState(requirementInfo.status || "");

  // Загружаем проекты и связываем их с текущим требованием
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await handleProjects();
        setProjects(result.data);

        // Устанавливаем проект, связанный с текущим требованием
        const relatedProject = result.data.find(
          (proj) => proj.projectId === requirementInfo.projectId
        );

        if (relatedProject) {
          setProject(relatedProject);
        }
      } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
      }
    };

    fetchProjects();
  }, [requirementInfo, handleProjects]);

  // Проверяем наличие requirementInfo
  if (!requirementInfo || !requirementInfo.requirementId) {
    return <p>Информация о требовании не найдена.</p>;
  }

  // Отправка формы
  const handleSubmit = (e, newStatus) => {
    e.preventDefault();

    const updatedRequirement = {
      requirementId: requirementInfo.requirementId,
      projectId: project?.projectId || null,
      name,
      description,
      status: newStatus || status,
      createdAt: requirementInfo.createdAt,
      createdBy: requirementInfo.createdBy,
      updatedAt: new Date().toISOString(),
      updatedBy: "current_user", // Замените на текущего пользователя
      projectName: project?.name || "",
      archive: false,
    };

    editRequirement(requirementInfo.id, updatedRequirement, handleButtonClick);
  };

  // Архивация требования
  const handleArchiveRequirement = () => {
    archiveRequirement(requirementInfo.id, handleButtonClick);
  };

  // Обновление информации о требовании
  const updateCurrentRequirement = () => {
    updateRequirement(requirementInfo.id, setRequirementInfo);
  };

  return (
    <div className="requirement-details">
      <button
        type="button"
        className="archive-project-button"
        onClick={updateCurrentRequirement}
      >
        Обновить
      </button>
      <h1>Изменение требования</h1>
      <form className="requirement-edit-form">
        <div className="form-group">
          <label>Название требования:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Проект:</label>
          <select
            value={project?.projectId || ""}
            onChange={(e) => {
              const selectedProject = projects.find(
                (proj) => proj.projectId === e.target.value
              );
              setProject(selectedProject);
            }}
            required
          >
            <option value="" disabled>
              Выберите проект
            </option>
            {projects.map((proj) => (
              <option key={proj.projectId} value={proj.projectId}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Описание требования:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Статус:</label>
          <input type="text" value={status} readOnly />
        </div>

        <button
          type="button"
          className="edit-requirement-button"
          onClick={(e) => handleSubmit(e, status)}
        >
          Сохранить изменения
        </button>
        <button
          type="button"
          className="edit-requirement-button"
          onClick={(e) => handleSubmit(e, "Рецензирование")}
        >
          Отправить на рецензирование
        </button>
        <button
          type="button"
          className="edit-requirement-button"
          onClick={(e) => handleSubmit(e, "Согласование")}
        >
          Отправить на согласование
        </button>
        <button
          type="button"
          className="edit-requirement-button"
          onClick={(e) => handleSubmit(e, "Тестирование")}
        >
          Отправить на тестирование
        </button>
      </form>

      <button
        type="button"
        className="archive-project-button"
        onClick={handleArchiveRequirement}
      >
        Архивировать требование
      </button>
    </div>
  );
};

export default Requirement;