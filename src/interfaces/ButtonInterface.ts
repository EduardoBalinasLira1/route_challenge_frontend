export interface IButton {
    type: "submit" | "reset" | "button" | undefined;
    className: string;
    text: string;
    onClick?: () => void 
}