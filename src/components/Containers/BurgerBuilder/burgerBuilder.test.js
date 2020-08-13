import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../Burger/BuildControls/BuildControls';

import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter:new Adapter()})

describe('<BurgerBuilder />',() => {
    // let wrapper;
    // beforeEach(() => {
    //     wrapper = shallow(<BurgerBuilder />)
    // })

    it('It should render <BuildControls /> when receive ingredients',() => {
        let wrapper = shallow(<BurgerBuilder initIngredient={()=>{}} />);
        wrapper.setProps({ingredients:{
            salad:1
        }});
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})