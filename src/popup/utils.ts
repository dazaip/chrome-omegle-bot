export const formObject = (form: HTMLFormElement) => {
    return Object.fromEntries([...new FormData(form)]);
};
