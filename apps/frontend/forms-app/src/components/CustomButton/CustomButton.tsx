import { CustomButtonProps } from '../../common/types';
import './CustomButton.scss'

const CustomButton = ({ title, handleSubmit }: CustomButtonProps) => {
    return (
        <button className="custom-button" onClick={handleSubmit}>{title}</button>
    )
}

export default CustomButton;