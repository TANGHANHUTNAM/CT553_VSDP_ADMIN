import React, { useEffect, useState } from "react";
import { BuilderContext } from "./BuilderContext";
import { IFormResponse } from "../../interfaces";
import { FormBlockInstance } from "../../interfaces/form-block";
import { useParams } from "react-router-dom";
import { getFormById } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { generateUniqueId } from "../../utils/functionUtils";
import NotFoundComponent from "../../components/NotFoundComponent";

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
  const [selectedBlockLayout, setSelectedBlockLayout] =
    useState<FormBlockInstance | null>(null);
  const { data } = useQuery({
    queryKey: ["form", form_id],
    queryFn: () => getFormById(form_id || ""),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.data?.json_blocks) {
      setBlocksLayout(JSON.parse(data.data.json_blocks));
    }
  }, [data]);

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

  return (
    <BuilderContext.Provider
      value={{
        formData: data?.data || formData,
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
      }}
    >
      {data?.data ? children : <NotFoundComponent />}
    </BuilderContext.Provider>
  );
};

export default BuilderContextProvider;
