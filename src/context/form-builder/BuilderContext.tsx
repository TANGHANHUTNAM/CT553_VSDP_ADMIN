import { createContext } from "react";
import { IFormResponse } from "../../interfaces";
import { FormBlockInstance } from "../../interfaces/form-block";

interface IBuilderContextProviderProps {
  formData: IFormResponse | null;
  setFormData: React.Dispatch<React.SetStateAction<IFormResponse | null>>;
  blocks: FormBlockInstance[];
  setBlocks: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
}

export const BuilderContext = createContext<IBuilderContextProviderProps>(
  {} as IBuilderContextProviderProps,
);
