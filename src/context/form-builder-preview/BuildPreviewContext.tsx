import { createContext } from "react";
import { IFormResponse } from "../../interfaces";

interface IBuilderPreviewContextProviderProps {
  formPreview: IFormResponse | undefined;
}

export const BuilderPreviewContext =
  createContext<IBuilderPreviewContextProviderProps>(
    {} as IBuilderPreviewContextProviderProps,
  );
