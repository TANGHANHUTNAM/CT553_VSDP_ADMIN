import { createContext } from "react";
import { IFormResponse } from "../../interfaces";
import { FormBlockInstance } from "../../interfaces/form-block";

interface IBuilderContextProviderProps {
  formData: IFormResponse | null;
  setFormData: React.Dispatch<React.SetStateAction<IFormResponse | null>>;
  blocksLayout: FormBlockInstance[];
  setBlocksLayout: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
  addBlockLayout: (block: FormBlockInstance) => void;
  duplicateBlockLayout: (blockId: string) => void;
  removeBlockLayout: (blockId: string) => void;
  selectedBlockLayout: FormBlockInstance | null;
  handleSelectedBlockLayout: (blockLayout: FormBlockInstance | null) => void;
  repositionBlockLayout: (
    activeId: string,
    overId: string,
    position: "above" | "below",
  ) => void;
  insertBlockLayoutAtIndex: (
    overId: string,
    newBlockLayout: FormBlockInstance,
    position: "above" | "below",
  ) => void;
  updatedBlockLayouts: (id: string, childrenBlock: FormBlockInstance[]) => void;
  updateChildBlock: (
    parentId: string,
    childrenBlockId: string,
    updatedBlock: FormBlockInstance,
  ) => void;
}

export const BuilderContext = createContext<IBuilderContextProviderProps>(
  {} as IBuilderContextProviderProps,
);
