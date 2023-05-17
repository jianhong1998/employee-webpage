import { FC, useEffect } from "react";
import { useAppDispatch } from "../store/index.store";
import { appHeaderAction } from "../store/appHeader.slice";

const NewEmployeePage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(appHeaderAction.setTitle({title: 'Add Employee'}));
    }, []);
    
    return (
        <>
        </>
    );
}

export default NewEmployeePage;