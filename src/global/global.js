import axios from "axios";

export default {
	// refreshToken() {
	// 	var refreshToken = localStorage.getItem('refreshToken')
	// 	this.getAccessToken(refreshToken);
	// },
	// getAccessToken(refreshToken) {
	// 	var authAxios = axios.create({
	// 		baseURL: 'https://test.examsdaily.in:8443/edaily-auth',
	// 	});
	// 	return new Promise((resolve, reject) => {
	// 		authAxios({
	// 			method: 'post',
	// 			url: 'oauth/token',
	// 			headers: {
	// 				'Authorization': 'Basic ' + btoa("barClientIdPassword:password"),
	// 				'Accept': 'application/json',
	// 				'Content-Type': 'application/x-www-form-urlencoded',
	// 			},
	// 			params: {
	// 				'grant_type': 'refresh_token',
	// 				'client_id': 'barClientIdPassword',
	// 				'refresh_token': refreshToken
	// 			}
	// 		}).then((response) => {
	// 			axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
	// 			localStorage.setItem('accessToken', response.data.access_token)
	// 			localStorage.setItem('refreshToken', response.data.refresh_token)
	// 			resolve(response);
	// 		}).catch((err) => {
	// 			reject(err);
	// 		});
	// 	});
	// },
	logout(accessToken) {
		var authAxios = axios.create({
			baseURL: 'https://test.examsdaily.in:8443/edaily-auth',
		});
		return new Promise((resolve, reject) => {
			authAxios({
				method: 'post',
				url: 'oauth/token/revokeById/' + accessToken,
			}).then((response) => {
				axios.defaults.headers.common['Authorization'] = 'Bearer ';
				// console.data(response.data);
				resolve(response);
			}).catch((err) => {
				reject(err);
			});
		});
	},
}