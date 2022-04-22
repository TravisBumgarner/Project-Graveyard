import React from 'react'

import languages from '../languages.json'

const LanguageThing = () => {
    const [input, setInput] = React.useState<string>('')
    const [showDropdown, setShowDropdown] = React.useState<boolean>(false)
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
        <div>
            <p>Selected Languages:</p>
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
            <input onFocus={() => setShowDropdown(true)} value={input} onChange={(event) => setInput(event.target.value)} />
            {
                showDropdown ? (
                    <ul>
                        {filteredLanguages.slice(0, 5).map(({ name, nativeName, isoCode }) => {
                            return (
                                <li
                                    key={isoCode}
                                >{name} ({nativeName})
                                    <button
                                        type="button"
                                        onClick={() => setSelectedLanguages((prev) => ([...prev, { isoCode, name, nativeName }]))}
                                    >
                                        Add
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )
                    : ''
            }
        </div>
    )
}

export default LanguageThing
