package kurakh.beautysalon.controller;

import kurakh.beautysalon.dto.request.UserRequest;
import kurakh.beautysalon.dto.response.DataResponse;
import kurakh.beautysalon.dto.response.UserResponse;
import kurakh.beautysalon.exception.WrongInputDataException;
import kurakh.beautysalon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public UserResponse save(@RequestBody UserRequest userRequest) throws WrongInputDataException {
        return userService.save(userRequest);
    }

    @GetMapping
    public List<UserResponse> findAll() {
        return userService.findAll();
    }


    @GetMapping("/page")
    public DataResponse<UserResponse> findAll(@RequestParam Integer page,
                                              @RequestParam Integer size,
                                              @RequestParam(required = false) Sort.Direction direction,
                                              @RequestParam(required = false) String fieldName,
                                              @RequestParam(required = false) String name
    ) {
        return userService.findAll(page, size, fieldName, direction, name);
    }

    @PutMapping
    public UserResponse update(@RequestParam Long id,
                                   @RequestBody UserRequest userRequest) throws WrongInputDataException {
        return userService.update(id, userRequest);
    }

    @DeleteMapping
    public void delete(@RequestParam Long id) throws WrongInputDataException {
        userService.delete(id);
    }
}

