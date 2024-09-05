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
