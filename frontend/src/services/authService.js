import { api, requestConfig } from "../utils/config";

//Register an user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
    .then((res) => res.json())
    .catch((err) => err);

    if(res){ //backend retorna id e token do usuário
        localStorage.setItem("user", JSON.stringify(res))
    }

    return res

  } catch (error) {
    console.log(error);
  }
};

//Logout
const logout = () => {
  localStorage.removeItem("user")
}

const authService = {
    register,
    logout,
}

export default authService
