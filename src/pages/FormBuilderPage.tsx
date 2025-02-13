import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import { PAGE_NAME } from "../constants/routerIndex";
import BuilderContextProvider from "../context/form-builder/BuilderContextProvider";
import BuilderDragOverlay from "../features/form-builder/BuilderDragOverlay";
import BuilderForm from "../features/form-builder/BuilderForm";
import { useDynamicTitle, useScrollTop } from "../hooks";
import { getFormById } from "../services";
const FormBuilderPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER);
  useScrollTop();
  const param = useParams();
  const form_id = param["form_id"];

  const { isFetching } = useQuery({
    queryKey: ["form", form_id],
    queryFn: () => getFormById(form_id || ""),
    staleTime: Infinity,
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const sensors = useSensors(mouseSensor);

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <>
      <DndContext sensors={sensors}>
        <BuilderContextProvider>
          <BuilderDragOverlay />
          <div className="flex h-full w-full flex-grow flex-col">
            <BuilderForm />
          </div>
        </BuilderContextProvider>
      </DndContext>
    </>
  );
};

export default FormBuilderPage;
