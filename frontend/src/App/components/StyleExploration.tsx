
import React from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { FaRegWindowClose } from "react-icons/fa";
import { darken, lighten } from 'polished';
import { NavLink, useNavigate } from 'react-router-dom'


const colorFactory = (color: string) => ({
    base: color,
    darkest: darken(0.1, color),
    darken: darken(0.25, color),
    lighten: lighten(0.25, color),
    lightest: lighten(0.1, color),
})


const PRIMARY = colorFactory('#6A7FDB')
const SECONDARY = colorFactory('#45CB85')
const TERTIARY = colorFactory('#57E2E5')
const QUATERNARY = colorFactory('#E08DAC')

const H1 = styled.h1`
    color: ${PRIMARY.base};
`

const H2 = styled.h2`
    color: ${PRIMARY.base};
    border-bottom: 2px solid ${PRIMARY.base};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}`

const StyledNavLink = ({ to, text }: { to: string, text: string }) => {
    return (
        <NavLink style={({ isActive }) => {
            return {
                fontWeight: isActive ? 700 : 100,
                color: SECONDARY.base
            }
        }} to={to} >{text}
        </NavLink>
    )
}

const Link = styled.a`
    color: ${SECONDARY.base};
`



const H3 = styled.h3`
    color: ${PRIMARY.base};
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

    ${({ variation }: { variation: 'primary' | 'secondary' | 'tertiary' | 'quaternary' }) => {
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
        } else if (variation === "secondary") {
            return `
                color: ${SECONDARY.base};
                border-color: ${SECONDARY.base};

                &:hover {
                    background-color: ${SECONDARY.lighten};
                    color: ${SECONDARY.darken};
                    border-color: ${SECONDARY.darken};
                }
            `
        } else if (variation === "tertiary") {
            return `
                color: ${TERTIARY.base};
                border-color: ${TERTIARY.base};

                &:hover {
                    background-color: ${TERTIARY.lighten};
                    color: ${TERTIARY.darken};
                    border-color: ${TERTIARY.darken};
                }
            `
        } else if (variation === "quaternary") {
            return `
                color: ${QUATERNARY.base};
                border-color: ${QUATERNARY.base};

                &:hover {
                    background-color: ${QUATERNARY.lighten};
                    color: ${QUATERNARY.darken};
                    border-color: ${QUATERNARY.darken};
                }
            `
        }
    }}

    &:hover {
    cursor: pointer;
}

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
    background-color: white;
    font-weight: 700;
    color: ${PRIMARY.base};
    border-color: ${PRIMARY.base};

    &:focus{
        border-color: ${PRIMARY.darken};
    }

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

const LabelAndInput = ({ value, name, label, handleChange, type }: LabelAndInputProps) => {
    return <LabelAndInputWrapper>
        <Label htmlFor={name}>{label}</Label>
        <Input type={type || 'text'} name={name} onChange={(event) => handleChange(event.target.value)} value={value} />
    </LabelAndInputWrapper>
}

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

const Modal = ({ children, showModal, closeModal, contentLabel }: ModalProps) => {
    return (
        <ReactModal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel={contentLabel}
            style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                content: {
                    borderColor: PRIMARY.base,
                    borderRadius: '1.5em',
                }
            }}
        >
            <ModalWrapper>
                <HeaderWrapper>
                    <H1>{contentLabel}</H1>
                    <FaRegWindowClose onClick={closeModal} size={"2rem"} />
                </HeaderWrapper>
                {children}
            </ModalWrapper>
        </ReactModal >
    )
}

const Table = styled.table`
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    border-color: ${PRIMARY.base};
    border-collapse: collapse;
    border-radius: 1em;
`

const TableHeader = styled.thead`
    font-weight: 700;
`

const TableBody = styled.tbody`
    font-weight: 100;
`

const TableRow = styled.tr`
    &:nth-child(2n+1){
        background-color: ${PRIMARY.lightest};   
    }

    &:nth-child(2n){
        background-color: ${PRIMARY.lighten};   
    }
    
`

const TableHeaderCell = styled.th`
    background-color: ${PRIMARY.lighten};    
    padding: 5px;
    
`
const TableBodyCell = styled.td`
    border-bottom: 2px solid ${PRIMARY.base};    
    padding: 10px;
    
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
    const [buzz, setBuzz] = React.useState<number>(0)

    return <div>
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
                    <TableHeaderCell>Foo</TableHeaderCell>
                    <TableHeaderCell>Bar</TableHeaderCell>
                    <TableHeaderCell>Buzz</TableHeaderCell>
                    <TableHeaderCell>Bazz</TableHeaderCell>
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
        <Label htmlFor='Name'>Name:</Label>
        <Input name="name" placeholder='Name?'></Input>
        <div>
            <Button variation="primary" onClick={() => setShowModal1(true)}>Primary Button</Button>
            <Button variation="secondary" onClick={() => setShowModal2(true)}>Secondary Button</Button>
            <Button variation="tertiary" onClick={() => setShowModal2(true)}>Tertiary Button</Button>
            <Button variation="quaternary" onClick={() => setShowModal2(true)}>Quaternary Button</Button>
        </div>
        <Modal contentLabel="Demo" showModal={showModal1} closeModal={() => setShowModal1(false)}>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique, arcu et bibendum posuere, est tellus blandit dolor, a scelerisque massa massa posuere ipsum. Aenean est justo, aliquet quis porttitor vel, eleifend non metus. Suspendisse eu dui at arcu condimentum dictum. Integer suscipit turpis massa, et pellentesque purus interdum et. Donec id pharetra libero, id tincidunt lectus. In fermentum leo sem, et feugiat urna tincidunt vitae. Nulla rutrum condimentum erat quis bibendum.</Paragraph>
            <Paragraph>Proin ligula velit, scelerisque et dapibus sed, tristique sed orci. Mauris neque ligula, faucibus id ante id, varius fermentum ex. In in ullamcorper felis. Maecenas at eros diam. Aliquam aliquam massa sit amet leo rhoncus, et sodales tellus posuere. Duis a dignissim libero. Quisque eu neque eget felis sagittis sodales. Nam volutpat orci id ligula mollis elementum.</Paragraph>
            <Button variation="primary" onClick={() => setShowModal1(true)}>Primary Button</Button>
            <Button variation="secondary" onClick={() => setShowModal1(true)}>Secondary Button</Button>
        </Modal>

        <Modal contentLabel="Input Demo" showModal={showModal2} closeModal={() => setShowModal2(false)}>


            <LabelAndInput name="foo" label='Foo!' value={foo} handleChange={(value) => setFoo(value)} />
            <LabelAndInput name="bar" label='Bar!' value={bar} handleChange={(value) => setBar(value)} />
            <Button variation="primary" onClick={() => setShowModal2(true)}>Primary Button</Button>
            <Button variation="secondary" onClick={() => setShowModal2(true)}>Secondary Button</Button>
        </Modal>
    </div>
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
    Link
}