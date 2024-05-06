import { IInput } from "../interfaces/InputInterface"

const Input: React.FC<IInput> = ({
    type,
    className,
    id,
    name,
    value,
    onChange,
    placeholder
}) => (

        <div className="mb-3">
        <input {...{type, className, id, name, value, onChange, placeholder}} required />

        </div>
    
)

export default Input