import React from 'react'

const DataPresenter = (
  {
    children,
    data,
    loader = <p>loading...</p>,
    transformData = data => data,
    isDataEmpty = data => !data,
  },
) => {
  if (isDataEmpty(data)) {
    return loader
  }

  if (data.error) {
    return <h3>{data.errorMessage || 'Error occured'}</h3>
  }

  return typeof children === 'function' ? children(transformData(data)) : children
}

export default DataPresenter