package rw.ac.rca.ne.cedric.server.services;

import rw.ac.rca.ne.cedric.server.models.User;

import java.util.List;

public interface IUserService {

    List<User> getAllUsers();

    User save(User user);

    User getLoggedInUser();
}
