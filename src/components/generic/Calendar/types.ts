import { SlotInfo, Event } from 'react-big-calendar'

export type onNavigateType = (date: Date) => void
export type onSelectEventType = (event: Event) => void
export type onSelectSlotType = (slotInfo: SlotInfo) => void
