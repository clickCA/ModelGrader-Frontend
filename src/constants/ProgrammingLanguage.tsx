import { Badge } from "../components/shadcn/Badge"

export const ProgrammingLanguageOptions = [
    {
        value: 'c',
        label: 'C',
        badge: <Badge className="bg-[#2B7FFE] text-[10px] 2xl:text-xs">C</Badge>
    },
    {
        value: 'cpp',
        label: 'C++',
        badge: <Badge className="bg-[#00589C] text-[10px] 2xl:text-xs">C++</Badge>
    },
    {
        value: 'python',
        label: 'Python',
        badge: <Badge className="bg-[#306998] text-[10px] 2xl:text-xs">Python</Badge>
    },
    {
        value: 'javascript',
        label: 'Javascript',
        badge: <Badge className="bg-[#F0DB4F] text-[10px] 2xl:text-xs">Javascript</Badge>
    },
]

export const ProgrammingLanguageLabel:{
    [key: string]: string
} = {
    'c': 'C',
    'cpp': 'C++',
    'python': 'Python',
    'javascript': 'Javascript'
}