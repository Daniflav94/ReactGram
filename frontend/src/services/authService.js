import { api, requestConfig } from "../utils/config";

//Register an user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
    .then((res) => res.json()) //transforma a resposta em json
    .catch((err) => err); //pega possíveis erros da requisição e nos retorna

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

//Sign in an user
const login = async(user) => {

  const config = requestConfig("POST", user)

  try {
    
    const res = await fetch(api + "/users/login", config).then((res) => res.json()).catch((err) => err)

    if(res){
      localStorage.setItem("user", JSON.stringify(res))
    }

    return res

  } catch (error) {
    console.log(error)
  }
}

const authService = {
    register,
    logout,
    login
}

export default authService
