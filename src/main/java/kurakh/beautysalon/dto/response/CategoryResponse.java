package kurakh.beautysalon.dto.response;

import kurakh.beautysalon.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CategoryResponse {
    private Long id;

    private String name;

    public CategoryResponse(Category category) {
        id = category.getId();
        name = category.getName();
    }
}
