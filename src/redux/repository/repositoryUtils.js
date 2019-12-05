export const returnData = response => ({
  success: response.status >= 200 && response.status < 300,
  data: response.data,
});

export const returnError = error => ({
  success: false,
  error,
});
