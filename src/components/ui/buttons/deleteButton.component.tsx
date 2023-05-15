import classes from './deleteButton.module.scss';

import { IconButton } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
    onClickHandler: MouseEventHandler;
}

const DeleteButton: FC<DeleteButtonProps> = ({onClickHandler}) => {
    return (
        <IconButton
            aria-label='delete'
            className={classes.deleteButton}
            onClick={onClickHandler}
        >
            <DeleteIcon className={classes.icon} />
        </IconButton>
    );
}

export default DeleteButton;