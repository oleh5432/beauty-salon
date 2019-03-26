package kurakh.beautysalon.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserRequest {
    private String name;

    private String phoneNumber;

    private String email;

    private String login;

    private String password;
}
