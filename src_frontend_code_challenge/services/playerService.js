import axios from "axios";
const API_URL = "http://localhost:8081/api/players";

export const getAllPlayers = () => axios.get(`${API_URL}/getall`);
export const getPlayerById = (id) => axios.get(`${API_URL}/getbyid/${id}`);
export const addPlayer = (player) => axios.post(`${API_URL}/create`, player);
export const updatePlayer = (id, player) =>
  axios.put(`${API_URL}/update/${id}`, player);
export const getPlayersSortedByJersey = () => axios.get(`${API_URL}/sortedByJersey`);
