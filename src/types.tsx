export type Navigation = {
    navigate: (scene: string) => void;
    dispatch: (scene: {}) => void;
    openDrawer: () => void;
    reset: ({routes: [string]}) => void;
    pop: () => void;
};
