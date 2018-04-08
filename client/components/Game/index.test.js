import React from 'react';
import { mount, shallow } from 'enzyme';
import { Game } from './index';

describe('Game Component', () => {
  let wrapper;
  let suitsStub = [
    {name: 'clubs', image: 'clubs'},
    {name: 'diamonds', image: 'diamonds'},
    {name: 'hearts', image: 'hearts'},
    {name: 'spades', image: 'spades'}
  ];
  let ranksStub = [
    {rank: 'A', value: 1},
    {rank: '2', value: 2},
    {rank: '3', value: 3},
    {rank: '4', value: 4},
    {rank: '5', value: 5},
    {rank: '6', value: 6},
    {rank: '7', value: 7},
    {rank: '8', value: 8},
    {rank: '9', value: 9},
    {rank: '10', value: 10},
    {rank: 'J', value: 10},
    {rank: 'Q', value: 10},
    {rank: 'K', value: 10}
  ];
  beforeEach(() => {
    wrapper = mount(<Game
      suits={suitsStub}
      ranks={ranksStub}
    />);
  });
  it('should render a title called BlackJack', () => {
    expect(wrapper.find('h3').text()).toEqual('BlackJack')
  });
  it('should render 3 buttons', () => {
    expect(wrapper.find('button').length).toEqual(3)
  });
  it('should render 1 game container', () => {
    expect(wrapper.find('.gameContainer').length).toEqual(1);
  });
  it('should render 1 dealer container', () => {
    expect(wrapper.find('.dealersContainer').length).toEqual(1);
  });
  it('should render 1 player container', () => {
    expect(wrapper.find('.playersContainer').length).toEqual(1);
  });
  it('should render 1 result container', () => {
    expect(wrapper.find('.resultContainer').length).toEqual(1);
  });
  it('should have an initial deck of 0 cards', () => {
    expect(wrapper.state('deck').length).toEqual(0);
  });
  it('should have a deck of 52 cards once game started', () => {
    wrapper.instance().startGame();
    expect(wrapper.state('deck').length).toEqual(52);
  });
  it('expects playersHand to be empty initially', () => {
    expect(wrapper.state('playersHand').length).toEqual(0);
  });
  it('expects dealersHand to be empty initially', () => {
    expect(wrapper.state('dealersHand').length).toEqual(0);
  });
  it('expects dealersHand to have 1 card once game started', async () => {
    jest.useFakeTimers();
    await wrapper.instance().startGame();
    jest.runAllTimers();
    expect(wrapper.state('dealersHand').length).toEqual(1);
  });
  it('expects playersHand to have 2 cards once game started', async () => {
    jest.useFakeTimers();
    await wrapper.instance().startGame();
    jest.runAllTimers();
    expect(wrapper.state('playersHand').length).toEqual(2);
  });
})
