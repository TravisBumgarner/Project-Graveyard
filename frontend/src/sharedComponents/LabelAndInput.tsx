import styled from 'styled-components'

const Input = styled.input`
    font-size: 1rem;
    border: 2px solid;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    width: 100%;
    box-sizing: border-box;
`

const TextArea = styled.textarea`
    font-size: 1rem;
    border: 2px solid;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    width: 100%;
    box-sizing: border-box;
`

const Label = styled.label`
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
`

const LabelAndInputWrapper = styled.div`
    margin: 0.5rem;

    ${Label}{
        display: block;
        box-sizing: border-box;
    }

    ${Input}{
        display: block;
        width: 100%;
        box-sizing: border-box;
    }
`

type LabelAndInputProps = {
    id: string
    label: string
    value: string
    handleChange: (value: string) => void
    placeholder?: string
    type?: 'textarea' | 'password' | 'number'
}

const LabelAndInput = ({
    value, id, label, handleChange, type, placeholder
}: LabelAndInputProps) => (
    <LabelAndInputWrapper>
        <Label htmlFor={id}>{label}</Label>
        {type === 'textarea' ? (
            <TextArea
                placeholder={placeholder}
                rows={5}
                autoComplete="on"
                id={id}
                onChange={(event) => handleChange(event.target.value)}
                value={value}
            />
        ) : (
            <Input
                placeholder={placeholder}
                autoComplete="on"
                type={type || 'text'}
                id={id}
                onChange={(event) => handleChange(event.target.value)}
                value={value}
            />
        )}
    </LabelAndInputWrapper>
)

export default LabelAndInput
export { Label }
