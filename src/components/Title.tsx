import React from "react"
import { ITitle } from "../interfaces/TitleInterface"

const Title: React.FC<ITitle> = ({text}) => (
    <h1 className="mt-3">{text}</h1>
)

export default Title