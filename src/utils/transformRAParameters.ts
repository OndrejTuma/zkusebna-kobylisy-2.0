const transformRAParameters = (filter: string, range?: string, sort?: string) => {
  const parsedFilter: {} = filter ? JSON.parse(filter) : {}
  const parsedRange: number[] = range ? JSON.parse(range) : [0, 9]
  const parsedSort: string[] = sort ? JSON.parse(sort) : ['id', 'ASC']

  return {
    parsedRange,
    filter: parsedFilter,
    range: parsedRange.join('-'),
    sort: {
      [parsedSort[0]]: parsedSort[1] === 'ASC' ? 1 : -1,
    },
  }
}

export default transformRAParameters