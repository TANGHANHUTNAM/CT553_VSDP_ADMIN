import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ALL_PERMISSIONS } from "../constants/permissions";
import { PAGE_NAME } from "../constants/routerIndex";
import BuilderContextProvider from "../context/form-builder/BuilderContextProvider";
import BuilderDragOverlay from "../features/form-builder/BuilderDragOverlay";
import BuilderForm from "../features/form-builder/BuilderForm";
import { useDynamicTitle, useScrollTop } from "../hooks";
import Access from "../router/Access";
const FormBuilderPage: React.FC = () => {
  useDynamicTitle(PAGE_NAME.FORM_BUILDER);
  useScrollTop();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const sensors = useSensors(mouseSensor);

  return (
    <Access permission={ALL_PERMISSIONS.FORM.GET_BY_ID} hideChildren={false}>
      <DndContext sensors={sensors}>
        <BuilderContextProvider>
          <BuilderDragOverlay />
          <div className="flex h-full w-full flex-grow flex-col">
            <BuilderForm />
          </div>
        </BuilderContextProvider>
      </DndContext>
    </Access>
  );
};

export default FormBuilderPage;
