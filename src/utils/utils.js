/** @format */

const debouncedSetQuery = (term, setQuery) => {
  clearTimeout(debouncedSetQuery.timeoutId);
  debouncedSetQuery.timeoutId = setTimeout(() => {
    setQuery(term);
  }, 500);
};


const LogoutHandler = (navigate) => {
  localStorage.clear()
  navigate('/')
}


export { debouncedSetQuery ,LogoutHandler };
