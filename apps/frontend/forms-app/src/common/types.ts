import type { FormBlocks } from '@quillforms/types';

export interface handleChangeContentProps {
    contentIndex: number,
    text: string,
}

export interface handleRadioBoxProps{
    contentIndex: number,
    text: boolean,
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
