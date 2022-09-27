import axios from "axios";
import { faker } from '@faker-js/faker';

const apiURL = process.env.REACT_APP_API;

const getUsers = () => {
  const response = axios.get(`${apiURL}/users`);
  return response;
};

const getUser = (id) => {
    const response = axios.get(`${apiURL}/users/${id}`);
    return response;
};

const authUser = (user) => {
    const response = axios.post(`${apiURL}/auth/login`, user);
    return response;
};



const getCreatedUser = (user) => {
    const avatar = faker.image.avatar();
    user.avatar = avatar;
    const response = axios.post(`${apiURL}/users`, user);

    return response;
};

const getUpdatedUser = (id, user) => {
  const response = axios.put(`${apiURL}/users/${id}`, user);

  return response;
};

const getDeletedUser = id => {
  const response = axios.delete(`${apiURL}/users/${id}`);

  return response;
};

const generateUsers = (num) => {
    for (let id=1; id <= num; id++) {

        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();
        let avatar = faker.image.avatar();
        axios.post(`${apiURL}/users`, {
            
            email,
            firstName,
            lastName,
            avatar
            })
    }
}
 


export { authUser, getUser, getUsers, getCreatedUser, getUpdatedUser, getDeletedUser, generateUsers };