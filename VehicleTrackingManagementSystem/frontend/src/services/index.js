import axios from "axios";

export const API_URL = "http://localhost:8080/api";


class AppServices {
  login(body) {
    return axios.post(`${API_URL}/users/` + "login", body);
  }

  updateUser(body, id) {
    return axios.put(`${API_URL}/users`, body);
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
  getVehicle(query) {
    return axios.get(`${API_URL}/vehilces?${query}`);
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
  getCarOwners() {
    return axios.get(`${API_URL}/carOwners`);
  }

  updateVehicleCarOwners(body, id) {
    return axios.put(`${API_URL}/vehicleCarOwners/` + id, body);
  }
  deleteVehicleCarOwners(id) {
    return axios.delete(`${API_URL}/vehicleCarOwners/` + id);
  }

  registerVehicleCarOwners(body) {
    return axios.post(`${API_URL}/vehicleCarOwners/`, body);
  }
  getVehicleCarOwnerss() {
    return axios.get(`${API_URL}/vehicleCarOwners`);
  }
}

export default new AppServices();