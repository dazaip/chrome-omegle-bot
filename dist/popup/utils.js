export const formObject = (form) => {
    return Object.fromEntries([...new FormData(form)]);
};
