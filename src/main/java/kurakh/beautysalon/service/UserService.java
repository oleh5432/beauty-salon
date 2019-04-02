package kurakh.beautysalon.service;

import kurakh.beautysalon.dto.request.UserRequest;
import kurakh.beautysalon.dto.response.DataResponse;
import kurakh.beautysalon.dto.response.UserResponse;
import kurakh.beautysalon.entity.User;
import kurakh.beautysalon.exception.WrongInputDataException;
import kurakh.beautysalon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserResponse save(UserRequest userRequest) throws WrongInputDataException {
        return new UserResponse(userRepository.save(userRequestToUser(userRequest, null)));
    }

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
        user.setLogin(userRequest.getLogin());
        user.setPassword(userRequest.getPassword());
        return user;
    }



    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User findOneById(Long id) throws WrongInputDataException {
        return userRepository.findById(id)
                .orElseThrow(() -> new WrongInputDataException("Product with id '" + id + "' not exists"));

    }
}
