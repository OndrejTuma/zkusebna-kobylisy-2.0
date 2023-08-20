import { ReservationItem } from 'LocalTypes';

interface GroupedReservationItem extends ReservationItem {
  quantity: number;
}

const getGroupItems = (items: ReservationItem[]): GroupedReservationItem[] => {
  const groupItemsMap: { [title: string]: GroupedReservationItem } = {};
  const groupedItems: GroupedReservationItem[] = [];

  items.forEach((item) => {
    if (!groupItemsMap[item.title]) {
      groupItemsMap[item.title] = { ...item, quantity: 1 };
      groupedItems.push(groupItemsMap[item.title]);
    } else {
      groupItemsMap[item.title].quantity++;
    }
  });

  return groupedItems.map((item) => ({
    ...item,
    title: item.quantity > 1 ? `${item.title} (${item.quantity}x)` : item.title,
  }));
};

export default getGroupItems;
