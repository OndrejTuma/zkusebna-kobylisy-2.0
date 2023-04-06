import { ReservationItem, ReservationType } from 'LocalTypes'
import getReservationChanges, { convertChangesToString } from './getReservationChanges'

describe('getReservationChanges', () => {
  it('should return empty object if no changes', () => {
    const res1 = {
      reservationType: '1',
      itemIds: ['1', '2'],
      price: 100,
    }
    const res2 = {
      reservationType: '1',
      itemIds: ['1', '2'],
      price: 100,
    }
    const result = getReservationChanges(res1, res2)
    expect(result).toEqual({})
  })

  it('should return reservationType if changed', () => {
    const res1 = {
      reservationType: '1',
      itemIds: ['1', '2'],
      price: 100,
    }
    const res2 = {
      reservationType: '2',
      itemIds: ['1', '2'],
      price: 100,
    }
    const result = getReservationChanges(res1, res2)
    expect(result).toEqual({ reservationType: '2' })
  })

  it('should return removedItems if changed', () => {
    const res1 = {
      reservationType: '1',
      itemIds: ['1', '2'],
      price: 100,
    }
    const res2 = {
      reservationType: '1',
      itemIds: ['1'],
      price: 100,
    }
    const result = getReservationChanges(res1, res2)
    expect(result).toEqual({ removedItems: ['2'] })
  })

  it('should return addedItems if changed', () => {
    const res1 = {
      reservationType: '1',
      itemIds: ['1', '2'],
      price: 100,
    }
    const res2 = {
      reservationType: '1',
      itemIds: ['1', '2', '3'],
      price: 100,
    }
    const result = getReservationChanges(res1, res2)
    expect(result).toEqual({ addedItems: ['3'] })
  })

  it('should return all changes if changed', () => {
    const res1 = {
      reservationType: '1',
      itemIds: ['1', '2'],
    }
    const res2 = {
      reservationType: '2',
      itemIds: ['1', '3'],
    }
    const result = getReservationChanges(res1, res2)
    expect(result).toEqual({ reservationType: '2', removedItems: ['2'], addedItems: ['3'] })
  })
})

describe('convertChangesToString', () => {
  it('should return empty string if no changes', () => {
    const changes = {}
    const items: ReservationItem[] = []
    const reservationTypes: ReservationType[] = []
    const result = convertChangesToString(changes, items, reservationTypes)
    expect(result).toEqual('')
  })

  it('should return reservationType if changed', () => {
    const changes = { reservationType: '1' }
    const items: ReservationItem[] = []
    const reservationTypes: ReservationType[] = [{ id: '1', title: 'Test', discount: 1 }]
    const result = convertChangesToString(changes, items, reservationTypes)
    expect(result).toEqual('Typ rezervace: <strong>Test</strong>')
  })

  it('should return removedItems if changed', () => {
    const changes = { removedItems: ['1'] }
    const items: ReservationItem[] = [{ id: '1', title: 'Test', price: 100, image: 'test', active: true }]
    const reservationTypes: ReservationType[] = []
    const result = convertChangesToString(changes, items, reservationTypes)
    expect(result).toEqual('Odebrané položky: <strong>Test</strong>')
  })

  it('should return addedItems if changed', () => {
    const changes = { addedItems: ['1'] }
    const items: ReservationItem[] = [{ id: '1', title: 'Test', price: 100, image: 'test', active: true }]
    const reservationTypes: ReservationType[] = []
    const result = convertChangesToString(changes, items, reservationTypes)
    expect(result).toEqual('Přidané položky: <strong>Test</strong>')
  })

  it('should return all changes if changed', () => {
    const changes = { reservationType: '1', removedItems: ['1'], addedItems: ['2'] }
    const items: ReservationItem[] = [
      { id: '1', title: 'Test1', price: 100, image: 'test', active: true },
      { id: '2', title: 'Test2', price: 100, image: 'test', active: true },
    ]
    const reservationTypes: ReservationType[] = [{ id: '1', title: 'Test', discount: 1 }]
    const result = convertChangesToString(changes, items, reservationTypes)
    expect(result).toEqual(
      'Typ rezervace: <strong>Test</strong><br/>Odebrané položky: <strong>Test1</strong><br/>Přidané položky: <strong>Test2</strong>',
    )
  })
})
