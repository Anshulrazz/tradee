"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store';
import { loadUser } from '@/store/slices/authSlice';

export default function LoadUser(): null {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((s: RootState) => s.auth);

  useEffect(() => {
    if (!user && status === 'idle') {
      dispatch(loadUser());
    }
  }, [user, status, dispatch]);

  return null;
}
