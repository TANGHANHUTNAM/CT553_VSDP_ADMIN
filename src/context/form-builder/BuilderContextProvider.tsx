import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import NotFoundComponent from "../../components/NotFoundComponent";
import {
  GLOBAL_COLOR,
  GLOBAL_COLOR_BACKGROUND,
  GLOBAL_COLOR_BLOCK,
} from "../../constants/colorCustom";
import { IFormResponse, IResponse } from "../../interfaces";
import { FormBlockInstance } from "../../interfaces/form-block";
import { getFormById } from "../../services";
import { generateUniqueId } from "../../utils/functionUtils";
import { BuilderContext } from "./BuilderContext";

import { IDataFormSectionResponse } from "../../interfaces/form-sections";

interface IBuilderContextProviderProps {
  children: React.ReactNode;
}

const BuilderContextProvider: React.FC<IBuilderContextProviderProps> = ({
  children,
}) => {
  const param = useParams();
  const form_id = param["form_id"];
  const [formData, setFormData] = useState<IFormResponse | null>(null);
  const [blocksLayout, setBlocksLayout] = useState<FormBlockInstance[]>([]);
  const [primaryColor, setPrimaryColor] = useState<string>(GLOBAL_COLOR);
  const [blockColor, setBlockColor] = useState<string>(GLOBAL_COLOR_BLOCK);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    GLOBAL_COLOR_BACKGROUND,
  );
  const [imge_url, setImageUrl] = useState<string>("");
  const [sectionsForm, setSectionsForm] = useState<IDataFormSectionResponse[]>(
    [],
  );

  const [selectedBlockLayout, setSelectedBlockLayout] =
    useState<FormBlockInstance | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<IDataFormSectionResponse | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSection, setIsLoadingSection] = useState<boolean>(false);

  useEffect(() => {
    setBlocksLayout(selectedSection?.json_blocks || []);
  }, [selectedSection]);

  useEffect(() => {
    const fetchFormBuilder = async () => {
      setIsLoading(true);
      try {
        const res: IResponse<IFormResponse> = await getFormById(form_id || "");
        if (res && res.data) {
          setFormData(res.data);
          setPrimaryColor(res.data.primary_color || GLOBAL_COLOR);
          setBlockColor(res.data.block_color || GLOBAL_COLOR_BLOCK);
          setBackgroundColor(
            res.data.background_color || GLOBAL_COLOR_BACKGROUND,
          );
          setImageUrl(res.data.image_url || "");
          setSectionsForm(res.data.form_sections);
        }
        if (res && res.error) {
          toast.error(res.message as string);
        }
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFormBuilder();
  }, [form_id]);

  const addBlockLayout = (block: FormBlockInstance) => {
    setBlocksLayout((prevBlocks) => [...prevBlocks, block]);
  };

  const duplicateBlockLayout = (blockId: string) => {
    setBlocksLayout((prevBlocks) => {
      const blockToDuplicate = prevBlocks.find((block) => block.id === blockId);
      if (!blockToDuplicate) return prevBlocks;
      const duplicatedBlockLayout = {
        ...blockToDuplicate,
        id: `layout-${generateUniqueId()}`,
        childBlock: blockToDuplicate?.childBlock?.map((child) => ({
          ...child,
          id: generateUniqueId(),
        })),
      };
      const updatedBlockLayouts = [...prevBlocks];
      const insertIndex =
        updatedBlockLayouts.findIndex((block) => block.id === blockId) + 1;
      updatedBlockLayouts.splice(insertIndex, 0, duplicatedBlockLayout);
      return updatedBlockLayouts;
    });
  };
  const removeBlockLayout = (blockId: string) => {
    setBlocksLayout((prevBlocks) =>
      prevBlocks.filter((block) => block.id !== blockId),
    );
    if (selectedBlockLayout?.id === blockId) setSelectedBlockLayout(null);
  };

  const handleSelectedBlockLayout = (blockLayout: FormBlockInstance | null) => {
    setSelectedBlockLayout(blockLayout);
  };

  const repositionBlockLayout = (
    activeId: string,
    overId: string,
    position: "above" | "below",
  ) => {
    setBlocksLayout((prevBlocks) => {
      const activeIndex = prevBlocks.findIndex(
        (block) => block.id === activeId,
      );
      const overIndex = prevBlocks.findIndex((block) => block.id === overId);
      if (activeIndex === -1 || overIndex === -1) return prevBlocks;
      const updatedBlocks = [...prevBlocks];
      const [removedBlock] = updatedBlocks.splice(activeIndex, 1);
      const insertIndex = position === "above" ? overIndex : overIndex + 1;
      updatedBlocks.splice(insertIndex, 0, removedBlock);
      return updatedBlocks;
    });
  };

  const insertBlockLayoutAtIndex = (
    overId: string,
    newBlockLayout: FormBlockInstance,
    position: "above" | "below",
  ) => {
    setBlocksLayout((prevBlocks) => {
      const overIndex = prevBlocks.findIndex((block) => block.id === overId);
      if (overIndex === -1) return prevBlocks;
      const updatedBlocks = [...prevBlocks];
      const insertIndex = position === "above" ? overIndex : overIndex + 1;
      updatedBlocks.splice(insertIndex, 0, newBlockLayout);
      return updatedBlocks;
    });
  };

  const updatedBlockLayouts = (
    id: string,
    childrenBlock: FormBlockInstance[],
  ) => {
    setBlocksLayout((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, childBlock: childrenBlock } : block,
      ),
    );
  };

  const updateChildBlock = (
    parentId: string,
    childrenBlockId: string,
    updatedBlock: FormBlockInstance,
  ) => {
    setBlocksLayout((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((parentBlock) => {
        if (parentBlock.id === parentId) {
          const updatedChildblock = parentBlock.childBlock?.map((childBlock) =>
            childBlock.id === childrenBlockId
              ? { ...childBlock, ...updatedBlock }
              : childBlock,
          );
          return { ...parentBlock, childBlock: updatedChildblock };
        }
        return parentBlock;
      });
      return updatedBlocks;
    });
  };

  const lockBlockLayout = (blockId: string) => {
    setBlocksLayout((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, isLocked: true } : block,
      ),
    );
  };

  const unlockBlockLayout = (blockId: string) => {
    setBlocksLayout((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, isLocked: false } : block,
      ),
    );
  };

  return (
    <BuilderContext.Provider
      value={{
        formData,
        primaryColor,
        setPrimaryColor,
        blockColor,
        setBlockColor,
        backgroundColor,
        setBackgroundColor,
        imge_url,
        setImageUrl,
        setFormData,
        blocksLayout: blocksLayout,
        setBlocksLayout,
        addBlockLayout,
        duplicateBlockLayout,
        removeBlockLayout,
        selectedBlockLayout,
        handleSelectedBlockLayout,
        repositionBlockLayout,
        insertBlockLayoutAtIndex,
        updatedBlockLayouts,
        updateChildBlock,
        lockBlockLayout,
        unlockBlockLayout,
        sectionsForm,
        setSectionsForm,
        isLoadingSection,
        setIsLoadingSection,
        selectedSection,
        setSelectedSection,
      }}
    >
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>{formData ? children : <NotFoundComponent />}</>
      )}
    </BuilderContext.Provider>
  );
};

export default BuilderContextProvider;
