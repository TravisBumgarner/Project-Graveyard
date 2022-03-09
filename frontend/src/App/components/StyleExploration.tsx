import React from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { FaRegWindowClose } from 'react-icons/fa'
import { darken, lighten } from 'polished'
import { NavLink } from 'react-router-dom'

const colorFactory = (color: string) => ({
    base: color,
    darkest: darken(0.25, color),
    darken: darken(0.10, color),
    lighten: lighten(0.1, color),
    lightest: lighten(0.25, color),
})

const PRIMARY = colorFactory('#57E2E5')
const SECONDARY = colorFactory('#6A7FDB')
const TERTIARY = colorFactory('#45CB85')
const ALERT = colorFactory('#E08DAC')
const DISABLED = colorFactory('#aaaaaa')
const DARKNESS = colorFactory('#242424')

const H1 = styled.h1`
    color: ${PRIMARY.base};
`

const H2 = styled.h2`
    color: ${SECONDARY.base};
    border-bottom: 2px solid ${PRIMARY.base};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
`

const StyledNavLink = ({ to, text }: { to: string, text: string }) => (
    <NavLink
        style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 100,
            color: TERTIARY.darken,
        })}
        to={to}
    >
        {text}
    </NavLink>
)

const ExternalLink = styled.a`
    color: ${TERTIARY.base};
`

const H3 = styled.h3`
    color: ${SECONDARY.base};
`

const AlertMessageWraper = styled.div`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    margin: 0.5rem;
    color: ${ALERT.base};
    border-color: ${ALERT.base};

`

const Button = styled.button`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    margin: 0.5rem;

    &:hover {
    cursor: pointer;
    }

    ${({ variation, disabled }: { variation: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'disabled', disabled?: boolean }) => {
        if (disabled) {
            return `
                color: ${DISABLED.base};
                border-color: ${DISABLED.base};

                &:hover {
                    background-color: ${DISABLED.lighten};
                    color: ${DISABLED.darken};
                    border-color: ${DISABLED.darken};
                    cursor: not-allowed;
                }
            `
        }

        if (variation === 'primary') {
            return `
                color: ${PRIMARY.base};
                border-color: ${PRIMARY.base};

                &:hover {
                    color: ${PRIMARY.darken};
                    border-color: ${PRIMARY.darken};
                    background-color: ${PRIMARY.lighten};
                }
            `
        } if (variation === 'secondary') {
            return `
                color: ${SECONDARY.base};
                border-color: ${SECONDARY.base};

                &:hover {
                    background-color: ${SECONDARY.lighten};
                    color: ${SECONDARY.darken};
                    border-color: ${SECONDARY.darken};
                }
            `
        } if (variation === 'tertiary') {
            return `
                color: ${TERTIARY.base};
                border-color: ${TERTIARY.base};

                &:hover {
                    background-color: ${TERTIARY.lighten};
                    color: ${TERTIARY.darken};
                    border-color: ${TERTIARY.darken};
                }
            `
        } if (variation === 'alert') {
            return `
                color: ${ALERT.base};
                border-color: ${ALERT.base};

                &:hover {
                    background-color: ${ALERT.lighten};
                    color: ${ALERT.darken};
                    border-color: ${ALERT.darken};
                }
            `
        }
    }}
`

const Paragraph = styled.p`
    color: ${PRIMARY.base};
    line-height: 1.15;
`

const Label = styled.label`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    color: ${PRIMARY.base};
`

const Audio = styled.audio`
    width: 100%;
`

const Input = styled.input`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    color: ${PRIMARY.base};
    border-color: ${PRIMARY.base};
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
    name: string
    label: string
    value: string
    handleChange: (value: string) => void
    type?: 'password'
}

const LabelAndInput = ({
    value, name, label, handleChange, type,
}: LabelAndInputProps) => (
    <LabelAndInputWrapper>
        <Label htmlFor={name}>{label}</Label>
        <Input autoComplete="on" type={type || 'text'} name={name} onChange={(event) => handleChange(event.target.value)} value={value} />
    </LabelAndInputWrapper>
)

type ModalProps = {
    children: JSX.Element | JSX.Element[]
    showModal: boolean
    closeModal: () => void
    contentLabel: string
}

const HeaderWrapper = styled.div`
    display: flex;
    margin: 0.5rem;
    justify-content: space-between;
    svg {
        cursor: pointer;
        fill: ${PRIMARY.base};

    &:hover {
        fill: ${PRIMARY.darken};
        }
    }
    `

const ModalWrapper = styled.div`
   
`

const Modal = ({
    children, showModal, closeModal, contentLabel,
}: ModalProps) => (
    <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel={contentLabel}
        style={{
            overlay: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: DARKNESS.lighten
            },
            content: {
                borderColor: PRIMARY.base,
                borderRadius: '1.5em',
                backgroundColor: DARKNESS.base
            },
        }}
    >
        <ModalWrapper>
            <HeaderWrapper>
                <H1>{contentLabel}</H1>
                <FaRegWindowClose onClick={closeModal} size="2rem" />
            </HeaderWrapper>
            {children}
        </ModalWrapper>
    </ReactModal>
)

const Table = styled.table`
    border: 2px solid;
    padding: 1rem;
    border-collapse: collapse;
    border-radius: 1em;
    border-collapse: separate;
    border-spacing: 0;
    background-color: ${PRIMARY.lightest};   
    width: 100%;
`

const TableHeader = styled.thead`
    font-weight: 700;
`

const TableBody = styled.tbody`
    font-weight: 100;
`

const TableRow = styled.tr`
    padding: 10px;
    &:nth-child(2n+1){
        background-color: ${PRIMARY.lightest};   
    }

    &:nth-child(2n){
        background-color: ${PRIMARY.lighten};   
    }
    
`

const TableHeaderCell = styled.th`
    background-color: ${PRIMARY.lighten};
    color: ${PRIMARY.darkest}; 
    padding: 10px;
    text-align: left;
    width: ${({ width }: { width: string }) => width};
    
`
const TableBodyCell = styled.td`
    padding: 10px;
    color: ${PRIMARY.darkest};
`

const OrderedList = styled.ol`
    color: ${PRIMARY.base};
`

const UnorderedList = styled.ol`
    color: ${PRIMARY.base};
`

const ListItem = styled.li`
`

const StyleExploration = () => {
    const [showModal1, setShowModal1] = React.useState<boolean>(false)
    const [showModal2, setShowModal2] = React.useState<boolean>(false)

    const [foo, setFoo] = React.useState<string>('')
    const [bar, setBar] = React.useState<string>('')

    return (
        <div>
            <H1>H1 Header</H1>
            <H2>H2 Header</H2>
            <H3>H3 Header</H3>
            <OrderedList>
                <ListItem>Hi</ListItem>
                <ListItem>Hi</ListItem>
                <ListItem>Hi</ListItem>
            </OrderedList>
            <Audio controls />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell width="25%">Foo</TableHeaderCell>
                        <TableHeaderCell width="25%">Bar</TableHeaderCell>
                        <TableHeaderCell width="25%">Buzz</TableHeaderCell>
                        <TableHeaderCell width="25%">Bazz</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                    </TableRow>
                    <TableRow>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                    </TableRow>
                    <TableRow>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                    </TableRow>
                    <TableRow>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                    </TableRow>
                    <TableRow>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                        <TableBodyCell>daksdkasd</TableBodyCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Paragraph>Plain Text.</Paragraph>
            <Label htmlFor="Name">Name:</Label>
            <Input name="name" placeholder="Name?" />
            <div>
                <Button variation="primary" onClick={() => setShowModal1(true)}>Primary Button</Button>
                <Button variation="secondary" onClick={() => setShowModal2(true)}>Secondary Button</Button>
                <Button variation="tertiary" onClick={() => setShowModal2(true)}>Tertiary Button</Button>
                <Button variation="alert" onClick={() => setShowModal2(true)}>Quaternary Button</Button>
            </div>
            <Modal contentLabel="Demo" showModal={showModal1} closeModal={() => setShowModal1(false)}>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique, arcu et bibendum pos</Paragraph>
                <Button variation="primary" onClick={() => setShowModal1(true)}>Primary Button</Button>
                <Button variation="secondary" onClick={() => setShowModal1(true)}>Secondary Button</Button>
            </Modal>

            <Modal contentLabel="Input Demo" showModal={showModal2} closeModal={() => setShowModal2(false)}>

                <LabelAndInput name="foo" label="Foo!" value={foo} handleChange={(value) => setFoo(value)} />
                <LabelAndInput name="bar" label="Bar!" value={bar} handleChange={(value) => setBar(value)} />
                <Button variation="primary" onClick={() => setShowModal2(true)}>Primary Button</Button>
                <Button variation="secondary" onClick={() => setShowModal2(true)}>Secondary Button</Button>
            </Modal>
            <AlertMessageWraper>Words! <Button variation="alert">OK!</Button></AlertMessageWraper>
        </div>

    )
}

export default StyleExploration
export {
    Table,
    TableBody,
    TableBodyCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Button,
    LabelAndInput,
    Input,
    Paragraph,
    H1,
    H2,
    H3,
    OrderedList,
    UnorderedList,
    ListItem,
    StyledNavLink,
    ExternalLink,
    PRIMARY,
    SECONDARY,
    TERTIARY,
    ALERT,
    Label,
    Modal,
    DARKNESS
}
