
interface FieldsProps {
    label: string;
    value: string;
}

export default function Fields({ label, value }: FieldsProps) {
    return (
        <div>
            <p className="text-sm italic text-black dark:text-white">{label}</p>
            <p className="text-[1rem] text-[#808080]">{value}</p>
        </div>
    )
}