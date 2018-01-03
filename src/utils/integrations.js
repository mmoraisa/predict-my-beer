export const API = 'http://localhost:3030'
let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
}

export const predict = (interactions,peopleCount,attendance,drinkMin,drinkMax) => {
    const params = {
        interactions,
        peopleCount,
        attendance,
        drinkMin,
        drinkMax
    }
    const urlParams = new URLSearchParams(Object.entries(params));
    return fetch(`${API}/predict?${urlParams}`, { headers })
        .then(res => res.text())
}