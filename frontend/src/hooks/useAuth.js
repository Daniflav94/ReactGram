import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

//vai verificar se o usuário está autenticado
export const useAuth = () => {
    const {user} = useSelector((state) => state.auth) //vai obter o usuário

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true) //aplicação não irá mostrar nada caso o usuário não esteja logado

    useEffect(() => {
        if(user){
            setAuth(true)
        }else{
            setAuth(false)
        }

        setLoading(false)
    }, [user])

    return { auth, loading}
}