import { useState, useEffect } from 'react';

export const useFetch = url => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        const getData = async () => {
            // useEffect의 전달되는 함수는 비동기함수를 이용 할 수 없으므로 비동기함수를 사용해야 할 때는 useEffect 내부에서 비동기함수를 정의하고 호출하는 방법으로 해결 가능
            try {
                setInProgress(true);
                const res = await fetch(url);
                const result = await res.json();
                setData(result);
            } catch (e) {
                setError(e);
            } finally {
                setInProgress(false);
            }
        };
        getData();
    }, []);

    return { data, error, inProgress };
}
