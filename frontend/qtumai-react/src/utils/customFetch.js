// import { BASE_URL } from "../config"
// import BASE_URL from "../../public/data/mainPageData.json"

export const customFetch = (
    endpoint,
    options = {},
    { onSuccess, onFail } = {}
) => {
    const opts = {
        method: "GET",
        headers: { 'Content-type': 'application/json' },
        ...options
    }

    return fetch("../../public/data/mainPageData.json" + endpoint, opts)
        .then(res => res.json())
        .then(res => onSuccess && onSuccess(res))
        .catch(err => onFail && onFail(err))
}