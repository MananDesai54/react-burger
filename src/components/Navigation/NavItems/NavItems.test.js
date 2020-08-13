//uses jest by default
import React from 'react';
import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

//enzyme setup
import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()})

describe('<NavItems />',() => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavItems />);
    })
    
    it('It should render Two NavItems if not authenticated',() => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('It should render Three NavItems if authenticated',() => {
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavItem)).toHaveLength(3);
    })

    it('It should have logout link if authenticated',() => {
        wrapper.setProps({isAuth:true});
        expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true);
    })
})