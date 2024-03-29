const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined
}

export default isDefined