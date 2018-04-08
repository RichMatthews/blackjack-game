import React from 'react';
import { mount, shallow } from 'enzyme';
import Dealer from './index';

describe('Dealer Component', () => {
  let wrapper;
  const dealersHandStub = [{rank: {rank: 'K', value: 10}, image: '', suit: 'hearts'}]
  const containsAceStub = jest.fn()
  const handTotalStub = jest.fn().mockReturnValue({total: 1})
  beforeEach(() => {
    wrapper = mount(<Dealer
      dealersHand={dealersHandStub}
      containsAce={containsAceStub}
      handTotal={handTotalStub}
    />);
  });
  it('should render a title called Dealers Hand', () => {
    expect(wrapper.find('h4').text()).toEqual('Dealers Hand')
  });
  it('should render 1 card container', () => {
    expect(wrapper.find('.cardContainer').length).toEqual(1);
  });
  it('expects dealer to have one card', () => {
    expect(dealersHandStub.length).toEqual(1);
  });
  it('expects card rank to be K', () => {
    expect(wrapper.find('.cardRank').text()).toEqual('K');
  });
  it('expects card value to be 10', () => {
    expect(wrapper.find('.cardSuit').text()).toEqual('hearts');
  });
  it('expects dealers hand to equal', () => {
    expect(handTotalStub('dealersHand').total).toEqual(1);
  });
})
