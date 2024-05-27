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
