import React from 'react'
import Enzyme, { shallow, adapter } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'

import Button from './Button'

Enzyme.configure({ adapter: new Adapter() })

describe('<Button>', () => {
  it('renders a <button>', () => {
    const renderedComponent = shallow(<Button />).dive()
    expect(renderedComponent.find("button")).to.have.length(1);
  })

  it('renders children when passed in', () => {
    const testString = 'Click Me'
    const wrapper = shallow(<Button>{testString}</Button>).dive();
    expect(wrapper.text()).to.equal(testString);
  })

  it('simulates click events', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button onClick={onClick} />).dive();
    wrapper.find('button').simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });

})