const getError = (err: any) => {
    if (err.response && err.response.data) {
        if (err.response.data.error) {
            return err.response.data.error;
        }
        if (err.response.data.message) {
            return err.response.data.message;
        }
        if (err.response.data.errorMessage) {
            return err.response.data.errorMessage;
        }
    }
    if (err.message) {
        return err.message;
    }
    return "An error occurred.";
};

export { getError };
