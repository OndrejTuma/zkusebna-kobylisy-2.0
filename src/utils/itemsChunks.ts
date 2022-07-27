export const splitItemIdsInChunks = (itemIds: string[], chunkSize = 40) => {
  const chunks = {}

  for (let i = 0; i < itemIds.length; i += chunkSize) {
    Object.assign(chunks, {
      [`items_${i}`]: itemIds.slice(i, i + chunkSize).join(','),
    })
  }

  return chunks
}

export const joinItemIdsFromChunks = (resource: { [key: string]: string } | undefined) => {
  if (!resource) {
    return []
  }

  return Object.entries(resource).filter(([ key ]) => key.startsWith('items_')).reduce<string[]>((allItems, [ , partial ]) => allItems.concat(partial.split(',')), [])
}