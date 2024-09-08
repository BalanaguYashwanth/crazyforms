import type { FormBlocks } from '@quillforms/types';
import { ReactNode } from 'react';

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

export interface IntegrationsProps{
    disconnect?: () => void;
    features?: any;
    accounts?: any;
}

export interface FormBuilderContextProviderProps {
    children: ReactNode,
    value: {
        [key: string]: any;
    }
}