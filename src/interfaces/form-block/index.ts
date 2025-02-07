export type FormCategoryType = "Layout" | "Form";

export type FormBlockType = "RowLayout";

export type ObjectBlockType = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;
  blockBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  createInstance: (id: string) => FormBlockInstance;
  canvasComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

export type FormBlockInstance = {
  id: string;
  blockType: FormBlockType;
  attributes?: Record<string, any>;
  isLocked?: boolean;
  childBlock?: FormBlockInstance[];
};

export type FormBlocksType = {
  [key in FormBlockType]: ObjectBlockType;
};
