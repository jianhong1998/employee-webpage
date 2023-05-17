import { FC, useEffect } from "react";
import { useAppDispatch } from "../store/index.store";
import { appHeaderAction } from "../store/appHeader.slice";

const EditEmployeePage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(appHeaderAction.setTitle({title: 'Edit Employee'}));
    }, []);
    
    return (
        <>
        </>
    );
}

export default EditEmployeePage;