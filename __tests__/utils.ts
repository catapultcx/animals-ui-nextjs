export function setUpFetchSuccessMock(data: any) {
  if (Array.isArray(data)) {
    setFetchUpMock(
      data.map((d: any) => ({
        json: async () => await Promise.resolve(d),
        ok: true
      }))
    )
  } else {
    setFetchUpMock([
      {
        json: async () => await Promise.resolve(data),
        ok: true
      }
    ])
  }
}

export function setUpFetchErrorMock(statusText: string | string[]) {
  if (Array.isArray(statusText)) {
    setFetchUpMock(
      statusText.map((t: string) => ({
        json: async () => await Promise.resolve(t),
        ok: true
      }))
    )
  } else {
    setFetchUpMock([
      {
        ok: false,
        statusText
      }
    ])
  }
}

export function throwErrorMock(errorText: string | string[]) {
  if (Array.isArray(errorText)) {
    setFetchUpMock(errorText, true)
  } else {
    setFetchUpMock([errorText], true)
  }
}

export function setFetchUpMock(response: any[], isError?: boolean) {
  // global.fetch = jest.fn().mockImplementation(async () => await Promise.resolve(response))
  const _fetch = (global.fetch = jest.fn())
  if (isError) {
    response.forEach((r) => {
      _fetch.mockReturnValueOnce(Promise.reject(new Error(r)))
    })
  } else {
    response.forEach((r) => {
      _fetch.mockReturnValueOnce(Promise.resolve(r))
    })
  }
}
