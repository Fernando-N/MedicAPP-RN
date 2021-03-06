type Navigation = {
    current: {
        navigate: (scene: string, ...extra) => void;
        dispatch: (scene: {}) => void;
        openDrawer: () => void;
        reset: ({routes: [string]}) => void;
        goBack: () => void;
    }
};

export default Navigation;
