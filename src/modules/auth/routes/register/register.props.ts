import { useState } from "react";

export const useRegisterProps = () => {
    const [auth, setAuth] = useState('')
    const [profile, setProfile] = useState('')
  
    return {
        auth,
        setAuth,
        profile,
        setProfile
    };
  };
  