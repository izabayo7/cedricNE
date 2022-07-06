import axios from "axios";

export const API_URL = "http://localhost:8080/api";


class AppServices {
  login(body) {
    return axios.post(`${API_URL}/users/` + "login", body);
  }

  updateUser(body, id) {
    return axios.put(`${API_URL}/users`, body);
  }

  getCurrentUser() {
    return axios.get(`${API_URL}/users/current`);
  }

  register(body) {
    return axios.post(`${API_URL}/users`, body);
  }

  deleteUser() {
    return axios.delete(`${API_URL}/users`);
  }

  updateVehicle(body, id) {
    return axios.put(`${API_URL}/vehicles/` + id, body);
  }
  deleteVehicle(id) {
    return axios.delete(`${API_URL}/vehicles/` + id);
  }

  registerVehicle(body) {
    return axios.post(`${API_URL}/vehicles/`, body);
  }
  getVehicles(query="page=1&limit=10") {
    return axios.get(`${API_URL}/vehicles?${query}`);
  }

  updateCarOwner(body, id) {
    return axios.put(`${API_URL}/carOwners/` + id, body);
  }
  deleteCarOwner(id) {
    return axios.delete(`${API_URL}/carOwners/` + id);
  }

  registerCarOwner(body) {
    return axios.post(`${API_URL}/carOwners/`, body);
  }
  getCarOwners(query="page=1&limit=10") {
    return axios.get(`${API_URL}/carOwners?${query}`);
  }

  updateVehicleCarOwner(body, id) {
    return axios.put(`${API_URL}/vehicleCarOwners/` + id, body);
  }
  deleteVehicleCarOwner(id) {
    return axios.delete(`${API_URL}/vehicleCarOwners/` + id);
  }

  registerVehicleCarOwner(body) {
    return axios.post(`${API_URL}/vehicleCarOwners/`, body);
  }
  getVehicleCarOwners(query="page=1&limit=10") {
    return axios.get(`${API_URL}/vehicleCarOwners?${query}`);
  }
}

export default new AppServices();