import { FaPenToSquare } from "react-icons/fa6";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "../../../interfaces/form-block";
import InputTextCanvasComponent from "./InputTextCanvasComponent";
import InputTextFormComponent from "./InputTextFormComponent";
import InputTextPropertiesComponent from "./InputTextPropertiesComponent";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "InputText";

export type InputTextAttributesType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
  min: number;
  max: number;
  type: "string" | "number" | "boolean" | "url" | "email";
  size: "small" | "middle" | "large";
  prefix: string;
  suffix: string;
  readOnly: boolean;
};

export type NewInstanceInputText = FormBlockInstance & {
  attributes: InputTextAttributesType;
};

export const InputTextBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Input Text",
      helperText: "Helper Text",
      required: true,
      placeHolder: "Enter text here.",
      min: 0,
      max: 255,
      type: "string",
      size: "middle",
      prefix: "",
      suffix: "",
      readOnly: false,
    },
  }),
  blockBtnElement: {
    icon: FaPenToSquare,
    label: "Input Text",
  },
  canvasComponent: InputTextCanvasComponent,
  formComponent: InputTextFormComponent,
  propertiesComponent: InputTextPropertiesComponent,
};

// function InputTextCanvasComponent({
//   blockInstance,
// }: {
//   blockInstance: FormBlockInstance;
// }) {
//   const block = blockInstance as NewInstanceInputText;
//   const { helperText, label, placeHolder, required, min, max, type } =
//     block.attributes;
//   return (
//     <div className="flex w-full flex-col gap-2">
//       <div className="mb-3 text-base">
//         <label className={`${required ? "text-red-500" : ""}`}>
//           {label}
//           {required && <span className="ml-1">*</span>}
//         </label>
//         {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
//       </div>
//       <Form>
//         <Form.Item
//           name={block?.id}
//           required={required}
//           rules={[
//             {
//               required: required,
//               message: `${label} is required`,
//             },
//             {
//               min: min,
//               message: `${label} must be at least ${min} characters`,
//             },
//             {
//               max: max,
//               message: `${label} must be at most ${max} characters`,
//             },
//           ]}
//         >
//           {type === "Password" ? (
//             <Input.Password
//               size="large"
//               allowClear
//               readOnly
//               variant="underlined"
//               className="!pointer-events-none w-2/3 cursor-default"
//               placeholder={placeHolder}
//             />
//           ) : (
//             <Input
//               size="large"
//               allowClear
//               readOnly
//               variant="underlined"
//               className="!pointer-events-none w-2/3 cursor-default"
//               placeholder={placeHolder}
//             />
//           )}
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// function InputTextFormComponent({
//   blockInstance,
// }: {
//   blockInstance: FormBlockInstance;
// }) {
//   const block = blockInstance as NewInstanceInputText;
//   const { helperText, label, placeHolder, required, min, max, type } =
//     block.attributes;
//   return (
//     <div className="flex w-full flex-col gap-2">
//       <div className="mb-3 text-base">
//         <label>
//           {label}
//           {required && <span className="ml-1 text-red-500">*</span>}
//         </label>
//         {helperText && <p className="mt-1 text-[0.9rem]">{helperText}</p>}
//       </div>
//       <Form>
//         <Form.Item
//           name={block?.id}
//           required={required}
//           rules={[
//             {
//               required: required,
//               message: `${label} is required`,
//             },
//             ...(type === "Email"
//               ? [
//                   {
//                     type: "email" as const,
//                     message: "Please enter a valid email",
//                   },
//                 ]
//               : []),
//             ...(type === "Text" || type === "Password"
//               ? [
//                   {
//                     min: min,
//                     message: `${label} must be at least ${min} characters`,
//                   },
//                   {
//                     max: max,
//                     message: `${label} must be at most ${max} characters`,
//                   },
//                 ]
//               : []),
//           ]}
//         >
//           <Input
//             size="large"
//             allowClear
//             variant="underlined"
//             className="w-2/3 cursor-default"
//             placeholder={placeHolder}
//           />
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// function InputTextPropertiesComponent({
//   positionIndex,
//   parentId,
//   blockInstance,
// }: {
//   positionIndex?: number;
//   parentId?: string;
//   blockInstance: FormBlockInstance;
// }) {
//   const block = blockInstance as NewInstanceInputText;
//   const { updateChildBlock } = useContext(BuilderContext);
//   const [form] = Form.useForm();
//   console.log("InputTextPropertiesComponent -> block", block.attributes);
//   useEffect(() => {
//     form.setFieldsValue({
//       label: block.attributes.label,
//       helperText: block.attributes.helperText,
//       required: block.attributes.required,
//       placeHolder: block.attributes.placeHolder,
//       min: block.attributes.min,
//       max: block.attributes.max,
//       type: block.attributes.type,
//     });
//   }, [block.attributes, form]);

//   const onValuesChange = (_: unknown, allValues: InputTextAttributesType) => {
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
//         <span className="text-lg font-medium">Input Text {positionIndex}</span>
//       </div>
//       <Form
//         form={form}
//         layout="horizontal"
//         onValuesChange={onValuesChange}
//         initialValues={{
//           label: block.attributes.label,
//           helperText: block.attributes.helperText,
//           required: block.attributes.required,
//           placeHolder: block.attributes.placeHolder,
//           min: block.attributes.min,
//           max: block.attributes.max,
//           type: block.attributes.type,
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
//         <Form.Item
//           label="Helper Text"
//           name="helperText"
//           rules={[
//             { required: false },
//             { max: 255, message: "Helper text must be at most 255 characters" },
//           ]}
//         >
//           <Input allowClear />
//         </Form.Item>
//         <Form.Item
//           label="Place Holder"
//           name="placeHolder"
//           rules={[
//             { required: false },
//             {
//               max: 255,
//               message: "Place holder must be at most 255 characters",
//             },
//           ]}
//         >
//           <Input allowClear />
//         </Form.Item>
//         <Form.Item
//           label="Type"
//           name="type"
//           rules={[{ required: false }]}
//           valuePropName="checked"
//         >
//           <Select
//             defaultValue={block.attributes.type}
//             options={[
//               { label: "Email", value: "Email" },
//               { label: "Text", value: "Text" },
//               { label: "Password", value: "Password" },
//             ]}
//           />
//         </Form.Item>
//         {(block.attributes.type === "Text" ||
//           block.attributes.type === "Password") && (
//           <>
//             <Form.Item label="Min" name="min" rules={[{ required: false }]}>
//               <InputNumber min={0} />
//             </Form.Item>
//             <Form.Item
//               label="Max"
//               name="max"
//               rules={[
//                 { required: false },
//                 {
//                   validator: async (_, value) => {
//                     if (value <= form.getFieldValue("min")) {
//                       return Promise.reject("Max must be greater than min");
//                     }
//                   },
//                 },
//               ]}
//             >
//               <InputNumber min={0} />
//             </Form.Item>
//           </>
//         )}

//         <Form.Item
//           label="Required"
//           name="required"
//           valuePropName="checked"
//           rules={[{ required: false }]}
//         >
//           <Switch size="small" />
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }
