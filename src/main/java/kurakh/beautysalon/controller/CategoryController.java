package kurakh.beautysalon.controller;

import kurakh.beautysalon.dto.request.CategoryRequest;
import kurakh.beautysalon.dto.response.CategoryResponse;
import kurakh.beautysalon.dto.response.DataResponse;
import kurakh.beautysalon.exception.WrongInputDataException;
import kurakh.beautysalon.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public CategoryResponse save(@RequestBody CategoryRequest categoryRequest) throws WrongInputDataException {
        return categoryService.save(categoryRequest);
    }

    @GetMapping
    public List<CategoryResponse> findAll() {
        return categoryService.findAll();
    }


    @GetMapping("/page")
    public DataResponse<CategoryResponse> findAll(@RequestParam Integer page,
                                                  @RequestParam Integer size,
                                                  @RequestParam(required = false) Sort.Direction direction,
                                                  @RequestParam(required = false) String fieldName,
                                                  @RequestParam(required = false) String name
    ) {
        return categoryService.findAll(page, size, fieldName, direction, name);
    }

    @PutMapping
    public CategoryResponse update(@RequestParam Long id,
                                  @RequestBody CategoryRequest categoryRequest) throws WrongInputDataException {
        return categoryService.update(id, categoryRequest);
    }

    @DeleteMapping
    public void delete(@RequestParam Long id) throws WrongInputDataException {
        categoryService.delete(id);
    }
}
