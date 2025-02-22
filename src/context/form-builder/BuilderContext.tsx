import { createContext } from "react";
import { IFormResponse } from "../../interfaces";
import { FormBlockInstance } from "../../interfaces/form-block";

interface IBuilderContextProviderProps {
  formData: IFormResponse | null;
  primaryColor: string;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
  blockColor: string;
  setBlockColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  imge_url: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
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
  lockBlockLayout(blockId: string): void;
  unlockBlockLayout(blockId: string): void;
}

export const BuilderContext = createContext<IBuilderContextProviderProps>(
  {} as IBuilderContextProviderProps,
);
