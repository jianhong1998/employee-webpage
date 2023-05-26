import { Button, IconButton } from "@mui/material";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "../../../store/index.store";
import { logoutPopupSliceAction } from "../../../store/logoutPopup.slice";

interface LogoutButtonProps {
    className: string
}

const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const dispatch = useAppDispatch();

    const handleResize = () => {
        setWindowSize(window.innerWidth);
    };

    const buttonOnClickHandler: MouseEventHandler = () => {
        dispatch(logoutPopupSliceAction.openPopup());
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <>
            {
                windowSize >= 992 &&
                <Button
                    variant={'contained'}
                    color={`error`}
                    size={'medium'}
                    startIcon={<LogoutIcon />}
                    className={className}
                    onClick={buttonOnClickHandler}
                >
                    Logout
                </Button>
            }
            {
                windowSize < 992 &&
                <IconButton
                    color={`error`}
                    className={className}
                    onClick={buttonOnClickHandler}
                >
                    <LogoutIcon fontSize={'large'} />
                </IconButton>
            }
        </>

    );
}

export default LogoutButton;