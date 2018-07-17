import React from 'react'
import Enzyme, { shallow, adapter } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'

import Textbox from './Textbox'
import { isatty } from 'tty';

Enzyme.configure({ adapter: new Adapter() })

describe('<Textbox>', () => {
  it('renders a <textarea>', () => {
    const renderedComponent = shallow(<Textbox />).dive()
    expect(renderedComponent.find('textarea')).to.have.length(1)
  })
})