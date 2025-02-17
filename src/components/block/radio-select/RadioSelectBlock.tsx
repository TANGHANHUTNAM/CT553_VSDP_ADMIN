import { FaRegDotCircle } from "react-icons/fa";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import RadioSelectCanvasComponent from "./RadioSelectCanvasComponent";
import RadioSelectFormComponent from "./RadioSelectFormComponent";
import RadioSelectPropertiesComponent from "./RadioSelectPropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "RadioSelect";

export type RadioSelectAttributes = {
  label: string;
  options: string[];
  required: boolean;
  inline: boolean;
};

export const RadioSelectBlock: ObjectBlockType = {
  blockCategory,
  blockType,
  blockBtnElement: {
    icon: FaRegDotCircle,
    label: "Radio Group",
  },
  createInstance: (id: string) => {
    return {
      id: `field-${id}`,
      blockType,
      isLocked: false,
      attributes: {
        label: "Select an option",
        options: ["Option 1", "Option 2", "Option 3"],
        required: true,
        inline: false,
      },
    };
  },
  canvasComponent: RadioSelectCanvasComponent,
  formComponent: RadioSelectFormComponent,
  propertiesComponent: RadioSelectPropertiesComponent,
};

export const styleRadioSelectInline: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

export type NewInstanceRadioSelect = FormBlockInstance & {
  attributes: RadioSelectAttributes;
};

// function RadioSelectCanvasComponent({
//   blockInstance,
// }: {
//   blockInstance: FormBlockInstance;
// }) {
//   const block = blockInstance as NewInstanceRadioSelect;
//   const { label, options, required, inline } = block.attributes;

//   return (
//     <div className="flex w-full flex-col gap-3">
//       <div className="text-base">
//         <label>
//           {label}
//           {required && <span className="ml-1 text-base text-red-500">*</span>}
//         </label>
//       </div>
//       <Form>
//         <Form.Item
//           name={block?.id}
//           rules={[{ required: required, message: `Please select ${label}` }]}
//         >
//           <Radio.Group style={!inline ? style : undefined}>
//             {options.map((option, index) => (
//               <Radio
//                 key={index}
//                 value={`${option}-${index}`}
//                 className="pointer-events-none"
//               >
//                 {option}
//               </Radio>
//             ))}
//           </Radio.Group>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// function RadioSelectFormComponent({
//   blockInstance,
// }: {
//   blockInstance: FormBlockInstance;
// }) {
//   const block = blockInstance as NewInstanceRadioSelect;
//   const { label, options, required, inline } = block.attributes;

//   return (
//     <div className="flex w-full flex-col gap-3">
//       <div className="text-base">
//         <label>
//           {label}
//           {required && <span className="ml-1 text-base text-red-500">*</span>}
//         </label>
//       </div>
//       <Form>
//         <Form.Item
//           name={block?.id}
//           rules={[{ required: required, message: `Please select ${label}` }]}
//         >
//           <Radio.Group style={!inline ? style : undefined}>
//             {options.map((option, index) => {
//               const uniqueId = `option-${generateUniqueId()}`;
//               return (
//                 <Radio id={uniqueId} key={index} value={option}>
//                   {option}
//                 </Radio>
//               );
//             })}
//           </Radio.Group>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// function RadioSelectPropertiesComponent({
//   positionIndex,
//   parentId,
//   blockInstance,
// }: {
//   positionIndex?: number;
//   parentId?: string;
//   blockInstance: FormBlockInstance;
// }) {
//   const block = blockInstance as NewInstanceRadioSelect;
//   const { updateChildBlock } = useContext(BuilderContext);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     form.setFieldsValue({
//       label: block.attributes.label,
//       options: block.attributes.options || [],
//       required: block.attributes.required,
//     });
//   }, [block.attributes, form]);
//   const onValuesChange = (_: unknown, allValues: RadioSelectAttributes) => {
//     if (!parentId) return;

//     updateChildBlock(parentId, block.id, {
//       ...block,
//       attributes: {
//         ...block.attributes,
//         ...allValues,
//       },
//     });
//   };
//   return (
//     <div className="mb-3 w-full">
//       <div className="mb-3 flex h-auto w-full justify-between gap-1">
//         <span className="text-lg font-medium"> Radio {positionIndex}</span>
//       </div>
//       <Form
//         form={form}
//         layout="horizontal"
//         onValuesChange={onValuesChange}
//         initialValues={{
//           label: block.attributes.label,
//           options: block.attributes.options || [],
//           required: block.attributes.required,
//         }}
//       >
//         <Form.Item
//           label="Label"
//           name="label"
//           rules={[
//             { required: true, message: "Label is required" },
//             { min: 3, message: "Label must be at least 3 characters" },
//             { max: 255, message: "Label must be at most 255 characters" },
//           ]}
//         >
//           <Input allowClear />
//         </Form.Item>

//         <Form.List name="options">
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map(({ key, name, ...restField }) => (
//                 <Space
//                   key={key}
//                   style={{
//                     display: "flex",
//                     marginBottom: 8,
//                     justifyContent: "center",
//                   }}
//                   align="baseline"
//                 >
//                   <Form.Item
//                     {...restField}
//                     name={[name]}
//                     key={key}
//                     rules={[{ required: true, message: "Option is required" }]}
//                   >
//                     <Input placeholder="Enter an option" allowClear />
//                   </Form.Item>
//                   <Button
//                     type="default"
//                     icon={<RiDeleteBin6Line />}
//                     onClick={() => {
//                       remove(name);
//                       onValuesChange({}, form.getFieldsValue());
//                     }}
//                     danger
//                   />
//                 </Space>
//               ))}
//               <Form.Item>
//                 <Button
//                   type="dashed"
//                   onClick={() => add(`Option ${fields.length + 1}`)}
//                   block
//                   icon={<BsPlusCircle />}
//                 >
//                   Add Option
//                 </Button>
//               </Form.Item>
//             </>
//           )}
//         </Form.List>

//         <Form.Item label="Inline" name="inline" valuePropName="checked">
//           <Switch size="small" value={block.attributes.inline} />
//         </Form.Item>

//         <Form.Item label="Required" name="required" valuePropName="checked">
//           <Switch size="small" value={block.attributes.required} />
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }
