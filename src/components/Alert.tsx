import React from "react"
import { IAlert } from "../interfaces/AlertInterface"

const Alert: React.FC<IAlert> = ({
    className,
    text
}) => (
    <div className={className} role="alert">
    {text}
    </div>
)

export default Alert