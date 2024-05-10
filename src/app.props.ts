import { useDispatch, useSelector } from "react-redux";
import { httpClient } from "./utils";
import { login, logout } from "./redux/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";


export const useAppProps = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(false);
    const getUser = async () => {
        try {
            setLoading(true);
            await httpClient('admin/me');
            if (localStorage.getItem("accessToken")) {
                dispatch(login())
            } else {
                navigate('/login');
            }
            setLoading(false);
        } catch (err: any) {
            message.error(err);
            navigate('/login');
            dispatch(logout())
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return {
        isAuth,
        loading,
    };
};
