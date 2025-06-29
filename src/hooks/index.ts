import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useDynamicTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const useScrollTop = (): void => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
