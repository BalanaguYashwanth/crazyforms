import { ReactNode } from 'react';
import type { FormBlocks } from '@quillforms/types';

export interface CustomTypeFormProps{
    blocks: FormBlocks,
    disableNavigationArrows?: boolean,
    handleSubmitExtraActions?: (data: { answers: FormAnswersProp; }) => void
}

export interface FormBuilderProps {
    contentBlock: FormBlocks;
    handleChangeContent: ({ contentIndex, text }: handleChangeContentProps) => void;
    addContentBlock: () => void;
    handleRadioBox: ({ contentIndex, text }: handleRadioBoxProps) => void;
}

export interface FormAnswersProp {
    [key: string]: {
        value: string
    }
}

export interface handleChangeContentProps {
    contentIndex: number,
    text: string,
}

export interface handleRadioBoxProps{
    contentIndex: number,
    text: boolean,
}


export interface QuestionBlockProps {
    id: string,
    attributes: object,
    key: string
}

export interface ObjectProps{
    [key: string]: string;
}

export interface FormBuilderContextProviderProps {
    children: ReactNode,
    value: {
        [key: string]: any;
    }
}

export interface CustomButtonProps {
    title: string,
    handleSubmit:()=>void;
}

export interface StepFormEditorProps{
    handleSetFormTitle: (text: string) => void,
    handleSetFormId : (id: number) => void
}

export interface IntegrationsProps { formId: number, formTitle: string }