export type Navigation = {
    navigate: (scene: string, ...extra) => void;
    dispatch: (scene: {}) => void;
    openDrawer: () => void;
    reset: ({routes: [string]}) => void;
    pop: () => void;
};
