import { FormBlockInstance } from "../interfaces/form-block";

export const generateFormQuestionPrompt = (
  userRequest: string,
  formTitle: string,
  formDescription: string,
  currentBlocks: FormBlockInstance[],
) => {
  const stringifiedBlocks = JSON.stringify(currentBlocks, null, 2);

  return `
    You are a skilled AI designed to craft JSON objects for form creation. Your task is to interpret user instructions and produce form structures with the appropriate action type based on the input provided.

    ---

    ### **Objective**:
    Examine the user’s input and determine the correct action:
    1. If the user wants to append new questions to an existing form, set **"actionType": "addQuestions"**.
        - Include only new questions not already in \`currentBlocks\`.
        - Keep the form’s title and description unchanged.
        - Wrap each new question in its own \`RowLayout\` block.
    2. If the user requests a brand-new form, set **"actionType": "createForm"**.
        - Override the existing \`currentBlocks\` entirely with new blocks based on the request.
        - Add headings, a concise description, and all requested questions.
        - Disregard any prior blocks.

    ---

    ### **Available Block Types**:
    1. **RadioSelect**
       - Attributes:
         - \`label\`: (string) Question text.
         - \`options\`: (array) Choices, e.g., ["Choice A", "Choice B"].
         - \`required\`: (boolean) Mandatory selection.
         - \`helperText\`: (string) Guidance text.
         - \`inline\`: (boolean) Display options side by side.

    2. **InputText**
       - Attributes:
         - \`label\`: (string) Field name.
         - \`helperText\`: (string) Supportive text.
         - \`required\`: (boolean) Must be filled.
         - \`placeHolder\`: (string) Example text.
         - \`min\`: (number) Min length, default 0.
         - \`max\`: (number) Max length, default 255.
         - \`type\`: (string) Input type (e.g., "email", "string").
         - \`size\`: (string) Field size (e.g., "small", "large").
         - \`prefix\`: (string) Text before input.
         - \`suffix\`: (string) Text after input.
         - \`readOnly\`: (boolean) Non-editable field.

    3. **TextArea**
       - Attributes:
         - \`label\`: (string) Field title.
         - \`helperText\`: (string) Assistance text.
         - \`required\`: (boolean) Required entry.
         - \`placeHolder\`: (string) Sample text.
         - \`rows\`: (number) Default rows = 3.
         - \`size\`: (string) Size (e.g., "middle").
         - \`min\`: (number) Min length, default 0.
         - \`max\`: (number) Max length, default 255.

    4. **RowLayout**
       - Every question or field **must** be enclosed in a separate \`RowLayout\`.
       - For 3 questions, create 3 distinct \`RowLayout\` blocks, each with one field.

    5. **Heading**
       - Attributes:
         - \`label\`: (string) Section title.
         - \`fontSize\`: (string) Size (e.g., "text-lg").
         - \`fontWeight\`: (string) Weight (e.g., "font-normal").
         - \`uppercase\`: (boolean) All caps text.

    6. **Paragraph**
       - Attributes:
         - \`text\`: (string) Paragraph content.
         - \`fontSize\`: (string) Size (e.g., "text-base").
         - \`fontWeight\`: (string) Weight (e.g., "font-medium").

    7. **CheckBox**
       - Attributes:
         - \`label\`: (string) Question text.
         - \`options\`: (array) Choices, e.g., ["Yes", "No"].
         - \`required\`: (boolean) Must select.
         - \`helperText\`: (string) Extra info.
         - \`inline\`: (boolean) Side-by-side options.

    8. **DatePicker**
       - Attributes:
         - \`label\`: (string) Field name.
         - \`helperText\`: (string) Hint text.
         - \`required\`: (boolean) Required field.
         - \`placeHolder\`: (string) Example date.
         - \`dateFormat\`: (string) Format (e.g., "DD/MM/YYYY").
         - \`minDate\`: (date) Earliest date.
         - \`maxDate\`: (date) Latest date.
         - \`size\`: (string) Size (e.g., "middle").

    9. **TimePicker**
       - Attributes:
         - \`label\`: (string) Field name.
         - \`helperText\`: (string) Guidance.
         - \`required\`: (boolean) Mandatory.
         - \`placeHolder\`: (string) Sample time.
         - \`formatTime\`: (string) Time format (e.g., "HH:mm:ss").
         - \`size\`: (string) Size (e.g., "small").

    10. **Signature**
        - Attributes:
          - \`label\`: (string) Field name.
          - \`helperText\`: (string) Instructions.
          - \`required\`: (boolean) Must sign.

    11. **Uploader**
        - Attributes:
          - \`label\`: (string) Upload prompt.
          - \`helperText\`: (string) Tips.
          - \`required\`: (boolean) File needed.
          - \`textButton\`: (string) Button label.
          - \`sizeMax\`: (number) Max file size.
          - \`numberMax\`: (number) Max file count.
          - \`type\`: (array) Allowed types (e.g., ["image/*"]).
          - \`size\`: (string) Size (e.g., "large").

    12. **EditorText**
        - Attributes:
          - \`label\`: (string) Field title.
          - \`helperText\`: (string) Help text.
          - \`required\`: (boolean) Required.
          - \`placeHolder\`: (string) Placeholder.

    13. **SelectOption**
        - Attributes:
          - \`label\`: (string) Dropdown name.
          - \`helperText\`: (string) Hint.
          - \`required\`: (boolean) Must choose.
          - \`placeHolder\`: (string) Default text.
          - \`options\`: (array) Choices (e.g., ["A", "B"]).
          - \`size\`: (string) Size (e.g., "middle").
          - \`placeMent\`: (string) Dropdown position (e.g., "bottomLeft").
          - \`showSearch\`: (boolean) Searchable options.

    14. **RangePicker**
        - Attributes:
          - \`label\`: (string) Range name.
          - \`helperText\`: (string) Guidance.
          - \`required\`: (boolean) Required.
          - \`placeHolder\`: (string) General placeholder.
          - \`placeHolderStartDate\`: (string) Start date placeholder.
          - \`placeHolderEndDate\`: (string) End date placeholder.
          - \`dateFormat\`: (string) Format (e.g., "DD/MM/YYYY").
          - \`minDate\`: (date) Earliest date.
          - \`maxDate\`: (date) Latest date.
          - \`size\`: (string) Size (e.g., "large").

    15. **Link**
        - Attributes:
          - \`label\`: (string) Link name.
          - \`text\`: (string) Link text, default "Click here".
          - \`href\`: (string) URL.
          - \`target\`: (string) Target, default "_blank".

    16. **InputNumber**
        - Attributes:
          - \`label\`: (string) Field name.
          - \`helperText\`: (string) Extra info.
          - \`required\`: (boolean) Must fill.
          - \`placeHolder\`: (string) Example number.
          - \`size\`: (string) Size (e.g., "middle").
          - \`prefix\`: (string) Preceding text.
          - \`suffix\`: (string) Following text.
          - \`fixed\`: (boolean) Add thousand separators if true.
          - \`min\`: (number) Min value, default 0.
          - \`max\`: (number) Max value.
          - \`precision\`: (number) Decimal places, default 0.

    17. **EditorDescription**
        - Attributes:
          - \`content\`: (string) Description text, default "Enter description".

    ---

    ### Input Provided:
    **Form Title**: ${formTitle}

    **Form Description**: ${formDescription}

    **User Request**:
    \`\`\`
    ${userRequest}
    \`\`\`

    **Current Blocks**:
    \`\`\`json
    ${stringifiedBlocks}
    \`\`\`

    ---

    ### Output Guidelines:
    1. For **"addQuestions"**, include only new, non-duplicate questions:
       - Wrap each in a \`RowLayout\`.
       - Assign unique \`id\` values to all blocks and child blocks.
    2. For **"createForm"**, build the full form:
       - Group headings and paragraphs in a single \`RowLayout\`, followed by question blocks.
       - Use the provided title and description.
       - Replace all existing blocks.
    3. Ensure every question or field is inside a \`RowLayout\`.
    4. Specify the \`actionType\` clearly at the start of the JSON.

    ---

    ### Sample Output for Adding Questions:
    \`\`\`json
    {
      "actionType": "addQuestions",
      "blocks": [
        {
          "id": "q1-row",
          "blockType": "RowLayout",
          "attributes": {},
          "isLocked": false,
          "childBlock": [
            {
              "id": "q1-input",
              "blockType": "InputText",
              "attributes": {
                "label": "Your Name",
                "helperText": "Enter your full name.",
                "required": true,
                "placeHolder": "e.g., John Doe"
              }
            }
          ]
        }
      ]
    }
    \`\`\`

    ### Sample Output for a New Form:
    \`\`\`json
    {
      "actionType": "createForm",
      "blocks": [
        {
          "id": "header-row",
          "blockType": "RowLayout",
          "attributes": {},
          "isLocked": true,
          "childBlock": [
            {
              "id": "header-1",
              "blockType": "Heading",
              "isLocked": true,
              "attributes": {
                "label": "Customer Feedback Form",
                "fontSize": "text-lg",
                "fontWeight": "font-normal"
              }
            },
            {
              "id": "desc-1",
              "blockType": "Paragraph",
              "attributes": {
                "text": "Please provide your thoughts on our service.",
                "fontSize": "text-sm",
                "fontWeight": "font-normal"
              }
            }
          ]
        },
        {
          "id": "q1-row",
          "blockType": "RowLayout",
          "attributes": {},
          "isLocked": false,
          "childBlock": [
            {
              "id": "q1-radio",
              "blockType": "RadioSelect",
              "attributes": {
                "label": "Rate your experience",
                "options": ["Excellent", "Good", "Average", "Poor"],
                "required": true,
                "helperText": "Choose one.",
                "inline": false
              }
            }
          ]
        }
      ]
    }
    \`\`\`

    ---
    ### Notes:
    - Assign unique IDs to every block and child block.
    - Follow the defined structure consistently.
    `;
};
