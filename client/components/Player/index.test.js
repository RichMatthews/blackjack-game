import React from 'react';
import { mount, shallow } from 'enzyme';
import Player from './index';

describe('Player Component', () => {
  let wrapper;
  const playersHandStub = [
    {rank: {rank: 'J', value: 10}, image: '', suit: 'diamonds'},
    {rank: {rank: '3', value: 3}, image: '', suit: 'spades'},
  ]
  const containsAceStub = jest.fn()
  const handTotalStub = jest.fn().mockReturnValue({total: 1})
  beforeEach(() => {
    wrapper = mount(<Player
      playersHand={playersHandStub}
      containsAce={containsAceStub}
      handTotal={handTotalStub}
    />);
  });
  it('should render a title called Players Hand', () => {
    expect(wrapper.find('h4').text()).toEqual('Players Hand')
  });
  it('should render 1 card container', () => {
    expect(wrapper.find('.cardContainer').length).toEqual(1);
  });
  it('expects player to have two cards', () => {
    expect(playersHandStub.length).toEqual(2);
  });
  it('expects card rank to be K', () => {
    expect(wrapper.find('.cardRank').first().text()).toEqual('J');
  });
  it('expects card value to be 10', () => {
    expect(wrapper.find('.cardSuit').first().text()).toEqual('diamonds');
  });
  it('expects players hand to equal', () => {
    expect(handTotalStub('playersHand').total).toEqual(1);
  });
})
