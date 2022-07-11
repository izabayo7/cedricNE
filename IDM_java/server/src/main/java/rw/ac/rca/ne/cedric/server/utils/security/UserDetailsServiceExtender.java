package rw.ac.rca.ne.cedric.server.utils.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.ac.rca.ne.cedric.server.models.User;
import rw.ac.rca.ne.cedric.server.repositories.IUserRepository;

@Service
public class UserDetailsServiceExtender implements UserDetailsService {

    private final IUserRepository userRepository;

    @Autowired
    public UserDetailsServiceExtender(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByEmailOrPhoneNumber(s, s).orElseThrow(() -> new UsernameNotFoundException("Invalid Credentials"));
        return UserPrinciple.create(user);
    }

    @Transactional
    public UserDetails loadByUserId(long id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return UserPrinciple.create(user);
    }
}
