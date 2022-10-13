import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const APP_name = process.env.REACT_APP_NAME;
	const SRV_port = process.env.REACT_APP_SRVPORT || 3106;
	const SRV_name = process.env.REACT_APP_SRVNAME || 'localhost';
	const SRV_debug = process.env.REACT_APP_SRVDEBUG || 'localhost';

	let debug = true;

	const activeHttpReq = useRef([]);

	const currentAppName = 'my-attendance';

	let srv;

	if (!debug) {
		srv = `http://${SRV_name}:${SRV_port}/`;
	} else {
		srv = `http://${SRV_debug}:${SRV_port}/`;
	}

	const SRV = srv;
	// console.log({ SRV });

	const sendRequest = useCallback(
		async (url, method = 'GET', body = undefined, headers = {}) => {
			setIsLoading(true);
			console.log({ srv });
			if (APP_name !== currentAppName) {
				console.log(APP_name + ' vs ' + currentAppName);
				setError('Nome applicazione errato. Verificare variabili ambientali');
				setIsLoading(false);
				return;
			}
			const httpAbortCtrl = new AbortController();
			activeHttpReq.current.push(httpAbortCtrl);
			try {
				const response = await fetch(SRV + url, {
					method: method,
					body: JSON.stringify(body),
					headers: headers,
					signal: httpAbortCtrl.signal,
				});
				const resType = response.headers.get('Content-Type').toString();
				// console.log(resType);

				let r;
				if (resType === 'application/json; charset=utf-8') {
					// console.log('json? -> ' + resType);
					r = await response.json();
				}
				if (resType === 'arraybuffer') {
					// console.log('PDF? -> ' + resType);
					r = response.arrayBuffer();
				}

				const responseData = await r;

				activeHttpReq.current = activeHttpReq.current.filter(
					reqCtrl => reqCtrl !== httpAbortCtrl
				);

				//> Rispondo response data
				if (debug) {
					console.warn('Debug ON');
				}
				console.log({ responseData });
				if (responseData?.message && responseData?.errorStatus) {
					throw new Error(responseData.message);
				}
				setTimeout(() => {
					setIsLoading(false);
				}, 200);
				return responseData;
			} catch (err) {
				setError(err.message || 'Something went wrong, please try again');
				setIsLoading(false);
				throw err;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpReq.current.forEach(abortCtrl => abortCtrl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
