const initialState = {
  isLoading: false,
  isError: false,
  data: null,
  nextPage: 0,
  error: null,
};

const loadingState = (data, nextPage) => ({
  isLoading: true,
  isError: false,
  data,
  nextPage,
  error: null,
});

const successState = (data, nextPage) => ({
  isLoading: false,
  isError: false,
  data,
  nextPage,
  error: null,
});

const errorState = error => ({
  isLoading: false,
  isError: true,
  data: null,
  nextPage: 0,
  error,
});

const endPageState = data => ({
  isLoading: false,
  isError: false,
  data,
  nextPage: 0,
  error: null,
});

const state = {
  initialState,
  loadingState,
  successState,
  errorState,
  endPageState,
};

export default state;
