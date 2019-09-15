package kurakh.beautysalon.service;

import kurakh.beautysalon.dto.request.UserRequest;
import kurakh.beautysalon.dto.request.UserRequestLogin;
import kurakh.beautysalon.dto.response.AuthenticationResponse;
import kurakh.beautysalon.dto.response.DataResponse;
import kurakh.beautysalon.dto.response.UserResponse;
import kurakh.beautysalon.entity.User;
import kurakh.beautysalon.entity.UserRole;
import kurakh.beautysalon.exception.WrongInputDataException;
import kurakh.beautysalon.repository.UserRepository;
import kurakh.beautysalon.security.JwtTokenTool;
import kurakh.beautysalon.security.JwtUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService  implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenTool jwtTokenTool;

    @Autowired
    private BCryptPasswordEncoder encoder;

//    public UserResponse save(UserRequest userRequest) throws WrongInputDataException {
//        return new UserResponse(userRepository.save(userRequestToUser(userRequest, null)));
//    }

    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }

    public DataResponse<UserResponse> findAll(Integer page, Integer size, String fieldName, Sort.Direction direction, String name) {
        if (direction == null) {
            direction = Sort.Direction.ASC;
        }
        if (fieldName == null) {
            fieldName = "id";
        }

        Page<User> categoriesPage = name == null ?
                userRepository.findAll(PageRequest.of(page, size, direction, fieldName)) :
                userRepository.findAllByNameLike(PageRequest.of(page, size, direction, fieldName), '%' + name + '%');

        return new DataResponse<>(
                categoriesPage.get().map(UserResponse::new).collect(Collectors.toList()),
                categoriesPage.getTotalPages(),
                categoriesPage.getTotalElements()
        );
    }

    public UserResponse update(Long id, UserRequest userRequest) throws WrongInputDataException {
        return new UserResponse(userRepository
                .save(userRequestToUser(userRequest, findOneById(id))));
    }

    private User userRequestToUser(UserRequest userRequest, User user) throws WrongInputDataException {
        if (user == null) {
            user = new User();
        }
        user.setName(userRequest.getName());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setEmail(userRequest.getEmail());
        user.setUsername(userRequest.getUsername()); //login
        user.setPassword(encoder.encode(userRequest.getPassword()));
        user.setUserRole(UserRole.USER);
        return user;
    }



    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User findOneById(Long id) throws WrongInputDataException {
        return userRepository.findById(id)
                .orElseThrow(() -> new WrongInputDataException("Product with id '" + id + "' not exists"));

    }



    public AuthenticationResponse register(UserRequest request) {
        String username = request.getUsername();
        if (userRepository.existsByName(username)) {
            throw new BadCredentialsException("User with login " + username + " already exists");
        }
        User user = new User();

        user.setName(request.getName());
        user.setUsername(username);
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUserRole(UserRole.USER);
        user.setPassword(encoder.encode(request.getPassword()));

        userRepository.save(user);

        UserRequestLogin userRequestLogin = new UserRequestLogin();

        user.setUsername(username);
        userRequestLogin.setPassword(encoder.encode(request.getPassword()));

        return login(userRequestLogin);
    }

    public AuthenticationResponse login(UserRequestLogin request) {
        String username = request.getUsername();
        User user = findByUsername(username);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, request.getPassword()));
        String token = jwtTokenTool.createToken(username, user.getUserRole());
        return new AuthenticationResponse(username, token);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        return new JwtUser(user.getPassword(), user.getUsername(), user.getUserRole(),
                user.getPhoneNumber(), user.getEmail(), user.getName());
    }

    private User findByUsername(String username)  {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with login " + username + " not exists"));
    }
}
