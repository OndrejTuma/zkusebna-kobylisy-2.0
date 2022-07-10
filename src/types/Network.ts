export type NetworkFailedState = {
  error: string,
}

export type NetworkState<T> = (T & {
  success: true,
}) | (NetworkFailedState & {
  success: false,
})