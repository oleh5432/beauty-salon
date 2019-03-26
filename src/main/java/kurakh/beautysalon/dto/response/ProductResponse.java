package kurakh.beautysalon.dto.response;

import kurakh.beautysalon.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ProductResponse {
    private Long id;

    private String name;

    private Integer timeMinutes;

    private LocalDateTime startTime;

    private Integer price;

    private String categoryName;

    public ProductResponse(Product product) {
        id = product.getId();
        name = product.getName();
        timeMinutes = product.getTimeMinutes();
        startTime = product.getStartTime();
        price = product.getPrice();
        if(product.getCategory() != null)
            categoryName = product.getCategory().getName();
    }
}
