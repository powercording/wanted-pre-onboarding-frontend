import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useRedirect() {
  return localStorage.getItem('token');
}
