package kurakh.beautysalon.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {

    private Long userId;

    private List<Long> productId;
}
