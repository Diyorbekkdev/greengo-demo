import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLoginProps = () => {
    const [auth, setAuth] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isRememberMe } = useSelector((state: any) => state.auth);
    return {
        auth,
        setAuth,
        dispatch,
        navigate,
        isRememberMe,
    };
  };
  