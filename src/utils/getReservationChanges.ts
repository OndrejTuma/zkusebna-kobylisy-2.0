import { Reservation, ReservationItem, ReservationType } from 'LocalTypes'
import { format } from 'date-fns'

import { dateTimeFormat } from '../consts/dateTimeFormats'
import getCETDate from './getCETDate'

type ReservationChanges = Pick<Reservation, "reservationType" | "dateStart" | "dateEnd"> & {
  removedItems?: string[]
  addedItems?: string[]
}

const allowedProps = ['reservationType', 'itemIds', 'dateStart', 'dateEnd']

function getReservationChanges(
  oldReservation: Reservation,
  newReservation: Reservation
): ReservationChanges {
  const changedProps = getChangedProps(oldReservation, newReservation)
  const filteredProps = changedProps.filter(key => allowedProps.includes(key))

  return filteredProps.reduce<ReservationChanges>((acc, prop) => {
    if (prop === 'itemIds') {
      const [itemIds1, itemIds2] = getUniqueArrays(oldReservation.itemIds, newReservation.itemIds)

      if (itemIds1.length > 0) {
        acc.removedItems = itemIds1
      }
      if (itemIds2.length > 0) {
        acc.addedItems = itemIds2
      }
    } else {
      // TODO: figure out how the hell to get rid of this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[prop] = newReservation[prop]
    }

    return acc
  }, {})
}

export function convertChangesToString(changes: ReservationChanges, items: ReservationItem[], reservationTypes: ReservationType[]): string {
  const { removedItems, addedItems, ...rest } = changes

  const changesArray = Object.entries(rest).map(([key, value]) => {
    if (key === 'reservationType') {
      const reservationType = reservationTypes.find(({ id }) => id === value)

      if (!reservationType) {
        throw new Error(`Reservation type with id ${value} not found`)
      }

      return `Typ rezervace: <strong>${reservationType.title}</strong>`
    }
    if (key === 'dateStart') {
      return `Začátek rezervace: <strong>${format(getCETDate(value!), dateTimeFormat)}</strong>`
    }
    if (key === 'dateEnd') {
      return `Konec rezervace: <strong>${format(getCETDate(value!), dateTimeFormat)}</strong>`
    }

    return ''
  }).filter(Boolean)

  if (removedItems) {
    const removedItemsTitles = items.filter(({ id }) => removedItems.includes(id)).map(({ title }) => title)

    changesArray.push(`Odebrané položky: <strong>${removedItemsTitles.join(', ')}</strong>`)
  }

  if (addedItems) {
    const addedItemsTitles = items.filter(({ id }) => addedItems.includes(id)).map(({ title }) => title)

    changesArray.push(`Přidané položky: <strong>${addedItemsTitles.join(', ')}</strong>`)
  }

  return changesArray.join('<br/>')
}

function getUniqueArrays(
  array1: string[],
  array2: string[]
): [string[], string[]] {
  const set1 = new Set(array1)
  const set2 = new Set(array2)

  // Remove common values from both sets
  set1.forEach((value) => {
    if (set2.has(value)) {
      set1.delete(value)
      set2.delete(value)
    }
  })

  // Convert sets back to arrays and return as a tuple
  return [Array.from(set1), Array.from(set2)]
}

function getChangedProps(
  res1: Reservation,
  res2: Reservation
): (keyof Reservation)[] {
  const changedKeys: (keyof Reservation)[] = []

  for (const key of Object.keys(res1) as (keyof Reservation)[]) {
    if (Array.isArray(res1[key]) && Array.isArray(res2[key])) {
      if (!_arraysEqual(res1[key] as string[], res2[key] as string[])) {
        changedKeys.push(key)
      }
    } else if (res1[key] !== res2[key]) {
      changedKeys.push(key)
    }
  }

  return changedKeys
}

function _arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export default getReservationChanges
