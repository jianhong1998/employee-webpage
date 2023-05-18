import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../../store/index.store";

const Loading: FC = () => {
    const { loadingStatus } = useAppSelector(state => state.loading);
    
    return (
        <>
            {
                loadingStatus &&
                <>
                    <CircularProgress
                        color={'primary'}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%'
                        }}
                    />
                    <Backdrop
                        sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loadingStatus}
                    />
                </>
            }
        </>
        
    );
};

export default Loading;