import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
  type: 'LOGIN' | '!LOGIN';
  isLogin: string | null;
  path: string;
}

export default function useRedirect(props: RedirectProps) {
  const { type, isLogin, path } = props;
  const navigate = useNavigate();

  useEffect(() => {
    switch (type) {
      case 'LOGIN':
        if (isLogin) navigate(path);
        break;
      case '!LOGIN':
        if (!isLogin) navigate(path);
        break;
      default:
        break;
    }
  }, [navigate]);
}
