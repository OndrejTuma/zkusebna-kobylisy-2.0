export type NetworkFailedState = {
  message: string,
}

export type NetworkState<T> = T | NetworkFailedState