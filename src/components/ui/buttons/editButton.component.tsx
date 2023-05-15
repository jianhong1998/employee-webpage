import classes from './editButton.module.scss';

import { IconButton } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import EditIcon from '@mui/icons-material/Edit';

interface EditButtonProps {
    onClickHandler: MouseEventHandler;
}

const EditButton: FC<EditButtonProps> = ({onClickHandler}) => {
    return (
        <IconButton
            aria-label="edit"
            className={classes.editButton}
            onClick={onClickHandler}
        >
            <EditIcon className={classes.icon} />
        </IconButton>
    );
}

export default EditButton;