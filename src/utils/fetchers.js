export const fetchMyself = async (authToken) => {
  try {
    const response = await fetch("http://localhost:8000/users/me", {
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
    const response = await fetch("http://localhost:8000/daos", {
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
    const response = await fetch("http://localhost:8000/daos/" + daoId, {
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

export const createDao = async (authToken, daoData) => {
  try {
    console.log(process.env.API_URL);
    const response = await fetch(`http://localhost:8000/daos`, {
      // const response = await fetch(`${process.env.API_URL}/daos`, {
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
      const myResult = { ...result };
      return myResult;
    } else {
      console.error("Failed to create DAO");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDaoUser = async (authToken, daoId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/daos/${daoId}/isadmin`,
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

export const getDaoMembers = async (daoId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/daos/${daoId}/members`,
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

export const getDaoTasks = async (daoId) => {
  try {
    const response = await fetch(`http://localhost:8000/daos/${daoId}/tasks`, {
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

export const createDaoTask = async (authToken, daoId, taskData) => {
  try {
    const response = await fetch(`http://localhost:8000/daos/${daoId}/task`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(taskData),
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

export const updateDaoTask = async (authToken, daoId, taskId, taskData) => {
  try {
    const response = await fetch(
      `http://localhost:8000/daos/${daoId}/task/${taskId}`,
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
      console.error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
