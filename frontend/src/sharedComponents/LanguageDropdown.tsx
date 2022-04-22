import React from 'react'
import styled from 'styled-components'

import { colors } from 'sharedComponents'
import languages from '../languages.json'

const Label = styled.label`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    color: ${colors.PRIMARY.base};
`

const Button = styled.button`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    font-weight: 700;
    width: 100%;
    background-color: transparent;
    border: 0;
    margin: 0.25rem 0;
    text-align: left;

    &:hover {
        cursor: pointer;
    }
`

const LanguageDropdownWrapper = styled.div`
    margin: 0.5rem;
    position: relative;
`

const Input = styled.input`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    color: ${colors.PRIMARY.base};
    border-color: ${colors.PRIMARY.base};
    width: 100%;
    box-sizing: border-box;
    display: block;
`

const DropdownList = styled.ul`
    position: absolute;
    border-radius: 1rem;
    left: 0;
    list-style: none;
    padding: 0.5rem;
    background-color: ${colors.PRIMARY.lightest};
    border: 2px solid rgb(87, 226, 229);
    margin: 0.5rem;
    z-index:998;

    display: ${({ showDropdown }: { showDropdown: boolean }) => (showDropdown ? 'block' : 'none')};
`

type LanguageDropdownProps = {
    label: string
}

const LanguageDropdown = ({ label }: LanguageDropdownProps) => {
    const [input, setInput] = React.useState<string>('')
    const [showDropdown, setShowDropdown] = React.useState<boolean>(true)
    const [selectedLanguages, setSelectedLanguages] = React.useState<{
        name: string;
        nativeName: string;
        isoCode: string;
    }[]>([])

    const [filteredLanguages, setFilteredLanguages] = React.useState<{
        name: string;
        nativeName: string;
        isoCode: string;
    }[]>(languages)

    React.useEffect(() => {
        setFilteredLanguages(
            languages.filter(({ name, nativeName, isoCode }) => {
                return (
                    (
                        name
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        || nativeName
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    )
                    && !selectedLanguages.some((selectedLanguage) => selectedLanguage.isoCode === isoCode))
            })
        )
    }, [input, selectedLanguages.length])

    return (
        <LanguageDropdownWrapper>
            <Label>{label}</Label>
            <ul>
                {selectedLanguages.map(({ name, nativeName, isoCode }) => (
                    <li key={isoCode}>{name} ({nativeName})
                        <button
                            type="button"
                            onClick={
                                () => setSelectedLanguages((prev) => [...prev].filter((selectedLanguage) => selectedLanguage.name !== name))
                            }
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <Input
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setShowDropdown(false)}
                value={input}
                onChange={(event) => setInput(event.target.value)}

            />
            <DropdownList showDropdown={showDropdown}>
                {filteredLanguages.slice(0, 5).map(({ name, nativeName, isoCode }) => {
                    return (
                        <li
                            key={isoCode}
                        >
                            <Button
                                type="button"
                                onClick={() => setSelectedLanguages((prev) => ([...prev, { isoCode, name, nativeName }]))}
                            >{name} ({nativeName})
                            </Button>
                        </li>
                    )
                })}
            </DropdownList>
        </LanguageDropdownWrapper>
    )
}

export default LanguageDropdown
