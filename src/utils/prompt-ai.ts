import { FormBlockInstance } from "../interfaces/form-block";

export const generateFormQuestionPrompt = (
  userRequest: string,
  formTitle: string,
  formDescription: string,
  currentBlocks: FormBlockInstance[],
) => {
  const stringifiedBlocks = JSON.stringify(currentBlocks, null, 2);

  return `
    You are an expert AI assistant for generating JSON objects for forms. Based on user descriptions, generate forms using the following structure and determine the appropriate action type:
     

    ---

    ### **Task Overview**:
    Analyze the user request and identify the action type:
    1. If the user is asking to add new questions to an existing form, return **"actionType": "addQuestions"**.
        - Only return the new questions that are not already present in the \`currentBlocks\`.
        - Do not modify the title or description of the form.
        - Ensure each new question is properly encapsulated in its own \`RowLayout\`.
    2. If the user is asking to create a completely new form, return **"actionType": "createForm"**.
        - Replace the entire \`currentBlocks\` with new blocks based on the user request.
        - Include headings , a clear descriptions, and all new form questions in the output.
        - Completely ignore existing blocks.

    ---
    
    ### **Block Types (Only Use These)**:
1. **RadioSelect**
   - Attributes:
     - \`label\`: (string) The question label.
     - \`options\`: (array) Options, e.g., ["Option 1", "Option 2"].
     - \`required\`: (boolean) If the field is required.
     - \`helperText\`: (string) Helper text.
     - \`inline\`: (boolean) If the options should be displayed inline.

2. **InputText**
   - Attributes:
     - \`label\`: (string) The field label.
     - \`helperText\`: (string) Helper text.
     - \`required\`: (boolean) If the field is required.
     - \`placeHolder\`: (string) Placeholder text.
      - \`min\`: (number) Minimum length default 0.
      - \`max\`: (number) Maximum length default 255.
      - \`type\`: (string) Field type, e.g., "email", "string", "url", "boolean", "number".
      - \`size\`: (string) Size, e.g., "small", "middle", "large".
      - \`prefix\`: (string) Prefix text.
      - \`suffix\`: (string) Suffix text.
      - \`readOnly\`: (boolean) If the field is read-only.

3. **TextArea**
   - Attributes:
     - \`label\`: (string) Field label.
     - \`helperText\`: (string) Helper text.
     - \`required\`: (boolean) If the field is required.
     - \`placeHolder\`: (string) Placeholder text.
     - \`rows\`: (number) Default rows = 3.
      - \`size\`: (string) Size, e.g., "small", "middle", "large".
      - \`min\`: (number) Minimum length default 0.
      - \`max\`: (number) Maximum length default 255.


4. **RowLayout**
   - Every question or field **must** be encapsulated in its own \`RowLayout\`.
   - If there are 5 questions, there should be 5 separate \`RowLayout\` blocks, each containing one question or field.

5. **Heading**
   - Attributes:
     - \`label\`: (string) The heading label (e.g., the section or subsection title).
     - \`fontSize\`: (string) Font size, e.g., "text-lg".
     - \`fontWeight\`: (string) Font weight, e.g., "font-normal".
     - \`uppercase\`: (boolean) If the text should be in uppercase.

6. **Paragraph**
   - Attributes:
     - \`text\`: (string) The text content of the paragraph.
     - \`fontSize\`: (string) Font size (e.g., "text-sm", "text-base", "text-lg").
     - \`fontWeight\`: (string) Font weight (e.g., "font-normal", "font-medium").

7.  **CheckBox**
   - Attributes:
      - \`label\`: (string) The question label.
      - \`options\`: (array) Options, e.g., ["Option 1", "Option 2"].
      - \`required\`: (boolean) If the field is required.
      - \`helperText\`: (string) Helper text.
      - \`inline\`: (boolean) If the options should be displayed inline.

8. **DatePicker**
   - Attributes:
      - \`label\`: (string) The question label.
      - \`helperText\`: (string) Helper text.
      - \`required\`: (boolean) If the field is required.
      - \`placeHolder\`: (string) Placeholder text.
      - \`dateFormat\`: (string) Date format, e.g., "DD/MM/YYYY".
      - \`minDate\`: (date) Minimum date.
      - \`maxDate\`: (date) Maximum date.
      - \`size\`: (string) Size, e.g., "large", "middle", "small".

9. **TimePicker**
    - Attributes:
        - \`label\`: (string) The question label.
        - \`helperText\`: (string) Helper text.
        - \`required\`: (boolean) If the field is required.
        - \`placeHolder\`: (string) Placeholder text.
        - \`formatTime\`: (string) Time format, e.g., "HH:mm:ss".
        - \`size\`: (string) Size, e.g., "large", "middle", "small".

10. **Signature**
    - Attributes:
        - \`label\`: (string) The question label.
        - \`helperText\`: (string) Helper text.
        - \`required\`: (boolean) If the field is required.

11. **Uploader**
    - Attributes:
        - \`label\`: (string) The question label.
        - \`helperText\`: (string) Helper text.
        - \`required\`: (boolean) If the field is required.
        - \`textButton\`: (string) Button text.
        - \`sizeMax\`: (number) Maximum size.
        - \`numberMax\`: (number) Maximum number of files.
        - \`type\`: (array) File types, e.g., ["image/*", "application/pdf", ".doc"] or [].
        - \`size\`: (string) Size, e.g., "small", "middle", "large".

12. **EditorText**
    - Attributes:
        - \`label\`: (string) The question label.
        - \`helperText\`: (string) Helper text.
        - \`required\`: (boolean) If the field is required.
        - \`placeHolder\`: (string) Placeholder text.

13. **SelectOption**
    - Attributes:
        - \`label\`: (string) The question label.
        - \`helperText\`: (string) Helper text.
        - \`required\`: (boolean) If the field is required.
        - \`placeHolder\`: (string) Placeholder text.
        - \`options\`: (array) Options, e.g., ["Option 1", "Option 2"].
        - \`size\`: (string) Size, e.g., "small", "middle", "large".
        - \`placeMent\`: (string) Placement, e.g., "topLeft", "topRight", "bottomLeft", "bottomRight".
        - \`showSearch\`: (boolean) If the search option should be displayed.

14. **RangePicker**
    - Attributes:
        - \`label\`: (string) The question label.
        - \`helperText\`: (string) Helper text.
        - \`required\`: (boolean) If the field is required.
        - \`placeHolder\`: (string) Placeholder text.
        - \`placeHolderStartDate\`: (string) Placeholder text for start date.
        - \`placeHolderEndDate\`: (string) Placeholder text for end date.
        - \`dateFormat\`: (string) Date format, e.g., "DD/MM/YYYY".
        - \`minDate\`: (date) Minimum date.
        - \`maxDate\`: (date) Maximum date.
        - \`size\`: (string) Size, e.g., "large", "middle", "small".

15. **Link**
    - Attributes:
        - \`label\`: (string) The question label. 
        - \`text\`: (string) The text content of the link. default "Click here".
        - \`href\`: (string) The URL of the link.
        - \`target\`: (string) The target attribute of the link. default "_blank".

16. **InputNumber**
    - Attributes:
        - \`label\`: (string) The question label.
        - \`helperText\`: (string) Helper text.
        - \`required\`: (boolean) If the field is required.
        - \`placeHolder\`: (string) Placeholder text.
        - \`size\`: (string) Size, e.g., "small", "middle", "large".
        - \`prefix\`: (string) Prefix text.
        - \`suffix\`: (string) Suffix text.
        - \`fixed\`: (boolean) When true, formats the number with thousands separators (commas). For example: 1000 becomes "1,000", 1000000 becomes "1,000,000" - 1234.56 becomes "1,234.56"
                                When false, displays the number without formatting. For example: 1000 remains "1000", 1000000 remains "1000000"1234.56 remains "1234.56" 
        - \`min\`: (number) Minimum value. default 0.
        - \`max\`: (number) Maximum value.
        - \`precision\`: (number) Decimal places for the number, default 0.
---


### Input Details:
**Form Title**: ${formTitle}

**Form Description**: ${formDescription}

**User Request**:
\`\`\`
${userRequest}
\`\`\`

**Existing Blocks**:
\`\`\`json
${stringifiedBlocks}
\`\`\`

---

### Output Requirements:
1. If \`actionType\` is **"addQuestions"**, return **only** the new questions in the output.
    - Do not include duplicate questions or modify existing ones.
    - Return new questions encapsulated in \`RowLayout\` blocks.
    - Include unique \`id\` for all blocks and child blocks.
2. If \`actionType\` is **"createForm"**, return the entire form structure, ensuring that headings and paragraphs are grouped within a single RowLayout, followed by all newly added blocks.
    - Completely replace the \`currentBlocks\`.
    - Use the title and description from the user request as part of the new form definition.
3. Ensure proper encapsulation of all questions and fields in \`RowLayout\` blocks.
4. Clearly identify the \`actionType\` at the top of the JSON output.

---

### Example Output for Adding Questions:
\`\`\`json
{
  "actionType": "addQuestions",
  "blocks": [
    {
      "id": "new-id-1",
      "blockType": "RowLayout",
      "attributes": {},
      "isLocked": false,
      "childBlock": [
        {
          "id": "new-id-2",
          "blockType": "InputText",
          "attributes": {
            "label": "Your Age",
            "helperText": "Enter your age in years.",
            "required": true,
            "placeHolder": "e.g., 25"
          }
        }
      ]
    }
  ]
}
\`\`\`

### Example Output for Creating a New Form:
\`\`\`json
{
  "actionType": "createForm",
  "blocks": [
    {
    "id": "row-layout-1",
    "blockType": "RowLayout",
    "attributes": {},
    "isLocked": true,
    "childBlock": [
        {
        "id": "heading-1",
        "blockType": "Heading",
        "isLocked": true,
        "attributes": {
          "label": "New Form for Survey",
          "fontSize": "text-lg",
          "fontWeight": "font-normal",
     
        }
      },
      {
        "id": "desc-1",
        "blockType": "Paragraph",
        "attributes": {
          "text": "This form is to gather user feedback.",
          "fontSize": "text-small",
          "fontWeight": "font-normal"
        }
      },
     ],
    },
    {
      "id": "new-id-3",
      "blockType": "RowLayout",
      "attributes": {},
      "isLocked": false,
      "childBlock": [
        {
          "id": "new-id-4",
          "blockType": "RadioSelect",
          "attributes": {
            "label": "How satisfied are you?",
            "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
            "required": true,
            "helperText": "Select one option.",
            "inline": false
          }
        }
      ]
    }
  ]
}
\`\`\`

---
### Important:
- Generate unique IDs for every block and child block.
- Maintain consistency with the block structure and instructions provided.

    `;
};
