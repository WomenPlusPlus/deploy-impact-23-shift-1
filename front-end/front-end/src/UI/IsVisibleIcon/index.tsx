import Visibility from './visibility.png';
import VisibilityOff from './visibility_off.png';

type Props = {
    isVisible: boolean;
};

const IsVisibleIcon = ({ isVisible }: Props) => {
    if (isVisible)
        return (
            <img src={Visibility} alt="is visible" width="16px" height="16px" />
        );
    else
        return (
            <img
                src={VisibilityOff}
                alt="isn't visible"
                width="16px"
                height="16px"
            />
        );
};

export default IsVisibleIcon;
