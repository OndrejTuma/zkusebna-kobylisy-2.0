import { ReservationItem } from 'LocalTypes'

import getGroupItems from './getGroupItems'

describe('getGroupItems', () => {
  it('groups items correctly', () => {
    const items: ReservationItem[] = [
      {
        id: '1',
        title: 'Item A',
        price: 10,
        active: true,
      },
      {
        id: '2',
        title: 'Item B',
        price: 20,
        active: true,
      },
      {
        id: '3',
        title: 'Item A',
        price: 10,
        active: true,
      },
      {
        id: '4',
        title: 'Item C',
        price: 30,
        active: true,
      },
    ]

    const groupedItems = getGroupItems(items)

    expect(groupedItems).toEqual([
      {
        id: '1',
        title: 'Item A (2x)',
        price: 10,
        active: true,
        quantity: 2,
      },
      {
        id: '2',
        title: 'Item B',
        price: 20,
        active: true,
        quantity: 1,
      },
      {
        id: '4',
        title: 'Item C',
        price: 30,
        active: true,
        quantity: 1,
      },
    ])
  })

  it('handles empty input', () => {
    const items: ReservationItem[] = []

    const groupedItems = getGroupItems(items)

    expect(groupedItems).toEqual([])
  })
})
