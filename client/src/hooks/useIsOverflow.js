import * as React from 'react';
import { useTemplates } from '../contexts/TemplateContext';


const useIsOverflow = (ref, callback) => {
    const {setIsOverflow, isOverflow} = useTemplates();

    // const [isOverflow, setIsOverflow] = React.useState(undefined);

    React.useLayoutEffect(() => {
        const { current } = ref;

        const trigger = () => {
            const hasOverflow = current.clientHeight > 1097;

            console.log("first  " + hasOverflow)


            // const doesOverflow = current.scrollHeight > current.clientHeight;

            console.log("sec  " + current.scrollHeight + " , cli " + current.clientHeight )

            setIsOverflow(hasOverflow);

            if (callback) callback(hasOverflow);
        };

        if (current) {
            trigger();
        }
    }, [callback, ref]);

    return isOverflow;
};

export default useIsOverflow;