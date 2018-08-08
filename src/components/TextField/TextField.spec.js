import React from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react'
import Enzyme, { shallow } from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/enzyme'
import { expect } from 'chai'
import sinon from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/sinon'
import Adapter from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/enzyme-adapter-react-16'

import Textbox from './TextField'

Enzyme.configure({ adapter: new Adapter() })

describe('<Textbox>', () => {
    it('renders a <textarea>', () => {
        const renderedComponent = shallow(<Textbox />).dive()
        expect(renderedComponent.find('textarea')).to.have.length(1)
    })

    it('renders text passed via the input prop', () => {
        const testString = 'Display Me'
        const wrapper = shallow(<Textbox input={testString} />).dive()
        expect(wrapper.text()).to.equal(testString)
    })

    it('passes text changes to onChange function', () => {
        const onChange = sinon.spy()
        const wrapper = shallow(<Textbox onChange={onChange} />).dive
        wrapper.find('textarea').simulate('keyPress', {key: 'a'})
        expect(onChange.calledOnce).to.equal(true)
    })
})