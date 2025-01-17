import { useEffect } from "react";
import "./Requirements.css";

const Requirements = ({
  requirementsList,
  handleRequirements,
  deleteRequirement,
  setRequirementsList,
  handleButtonClick,
  setRequirementInfo,
}) => {
  useEffect(() => {
    handleRequirements();
  }, []);

  const handleRequirementClick = (
    requirementId,
    name,
    createdBy,
    projectName,
    createdAt,
    updatedAt,
    status,
    description
  ) => {
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

  return (
    <div className="requirements-container">
      <button className="refresh-button" onClick={handleRequirements}>
        Обновить требования
      </button>

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
          {requirementsList.map((requirement) => (
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
                      requirement.updatedAt
                        ? requirement.updatedAt.split("T")[0]
                        : "Не изменялось",
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
              <td>
                {new Date(requirement.createdAt).toLocaleDateString() ||
                  "Не указано"}
              </td>
              <td>
                {requirement.updatedAt
                  ? new Date(requirement.updatedAt).toLocaleDateString()
                  : "Не изменялось"}
              </td>
              <td>{requirement.status || "Не указано"}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() =>
                    deleteRequirement(
                      requirement.requirementId,
                      setRequirementsList
                    )
                  }
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requirements;