package kurakh.beautysalon.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
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

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    private LocalDateTime startTime
////            = null
//           ;

    @NotNull
    @Positive
    private Integer price;

    @NotNull
    private Long categoryId;
}
