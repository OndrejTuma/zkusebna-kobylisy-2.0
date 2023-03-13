export type NetworkFailedState = {
  message: string,
}

export type NetworkState<T> = (T & {
  success: true,
}) | (NetworkFailedState & {
  success: false,
})