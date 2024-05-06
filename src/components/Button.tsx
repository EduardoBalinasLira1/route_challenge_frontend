import React from "react"
import { IButton } from "../interfaces/ButtonInterface"

const Button: React.FC<IButton> = ({
    type,
    className,
    text,
    onClick
}) => (
    <button type={type} className={className} onClick={onClick}>{text}</button>
)

export default Button