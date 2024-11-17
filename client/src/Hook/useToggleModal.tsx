import { useState } from 'react';

const useToggleModal = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    function toggleModal() {
        setIsVisible(!isVisible);
    }
    return {
        isVisible,
        toggleModal,
    }
};
export default useToggleModal;