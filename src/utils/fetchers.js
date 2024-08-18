export const fetchMyself = async (authToken) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      const myResult = { ...result };
      localStorage.setItem("profile", JSON.stringify(myResult));
      return myResult;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDaos = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/daos`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDao = async (daoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const createDao = async (authToken, daoData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/daos`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(daoData),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to create DAO");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateDao = async (authToken, daoId, daoData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(daoData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to update DAO");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteDao = async (authToken, daoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}`,
      {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to delete DAO");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDaoUser = async (authToken, daoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/ismember`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();

      return result;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const joinDao = async (authToken, daoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/join`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();

      return result;
    } else {
      console.error("Failed to join dao");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDaoMembers = async (daoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/members`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDaoAdmin = async (daoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/admin`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to fetch dao admin");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDaoTasks = async (daoId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/tasks`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUserTasks = async (authToken) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/tasks/user`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      // const myResult = { ...result };
      return result;
    } else {
      console.error("Failed to fetch user tasks");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const createDaoTask = async (authToken, daoId, taskData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/task`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(taskData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateDaoTask = async (authToken, daoId, taskId, taskData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/task/${taskId}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(taskData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      // const myResult = { ...result };
      return result;
    } else {
      console.error("Failed to update Task");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteDaoTask = async (authToken, daoId, taskId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/daos/${daoId}/task/${taskId}`,
      {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const assignTaskToUser = async (authToken, taskId, userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/tasks/${taskId}/assign`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (response) {
      const result = await response.json();
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const emailSender = async (authToken, email, subject, mailBody) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sendmail`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ recipient: email, subject, body: mailBody }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to create DAO");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
