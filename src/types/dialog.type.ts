export interface IDialogBaseRef {
    show: (callback?: () => void) => void;
    hide: () => void;
  }