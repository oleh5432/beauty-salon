package kurakh.beautysalon.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@Setter
public class ProductRequest {

    @NotBlank
    @Size(min = 2)
    private String name;

    @NotNull
    @Positive
    private Integer timeMinutes;

    private LocalDateTime startTime;

    @NotNull
    @Positive
    private Integer price;

    @NotNull
    private Long categoryId;
}
