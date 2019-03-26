package kurakh.beautysalon.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OrderResponse {
    private Long id;

    private List<ProductResponse> productResponseList;

    private String userName;
}
