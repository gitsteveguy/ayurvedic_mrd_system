import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { jwtDecode } from 'jwt-decode'

const useAuth = ()=>{
    const auth = useAuthUser();
    const token  = auth.token;
    const user = jwtDecode(token)
    return user.User;
}

export default useAuth;